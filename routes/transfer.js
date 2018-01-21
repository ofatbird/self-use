var express = require('express')
var fs = require('fs')
var path = require('path')
var EventEmitter = require('events')
var formidable = require('formidable')
var router = express.Router()
var __OUTDATED = (function (fs) {
  var res = fs.readdirSync(path.join(__dirname, '../public/file'))
  return res.length ? path.join(__dirname, '../public/file', res[0]) : ''
})(fs)
var isBusy = false
var emitter = new EventEmitter()

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(path.basename(__OUTDATED))
  res.render('transfer', { visibility: 'hidden',imgName: path.basename(__OUTDATED) })
})
  .get('/msg', function (req, res, next) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    function sendMsg (name) {
      var fileName = path.basename(name)
      res.write('\n')
      res.write('data: ' + fileName + '\n\n')
    }
    emitter.on('done', sendMsg)
    req.on('close', function () {
      emitter.removeListener('done', sendMsg)
    })
  })
  .get('/download/*', function (req, res, next) {
    while(isBusy) {}
    if (__OUTDATED) {
      res.download(__OUTDATED)
    } else {
      res.send('File is empty now!!!')
    }
  })
  .post('/', function (req, res, next) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.maxFieldsSize = 1024 * 1024 * 1024
    form.uploadDir = path.join(__dirname, '../public/file')
    form.onPart = function (part) {
      if (part.filename) {
        // let formidable handle all non-file parts 
        form.handlePart(part)
      }
    }
    form.on('file', function (name, file) {
      var name = path.join(form.uploadDir, file.name)
      isBusy = true
      if (__OUTDATED) {
        fs.unlinkSync(__OUTDATED)
      }
      __OUTDATED = name
      fs.rename(file.path, name)
      emitter.emit('done', name)
      console.log('!!!!!', name)
      isBusy = false
    })
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.status(404)
        res.end('failed')
      } else {
        res.writeHead(200, {'content-type': 'text/plain'})
        res.end(`{"success":true}`)
      }
    })
  })

module.exports = router
