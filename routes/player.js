var express = require('express')
var path = require('path')
var fs = require('fs')
var jsonfile = require('jsonfile')
var router = express.Router()

const videos = fs.readdirSync(path.join(__dirname, '../public/videos'))
const bson = {}
videos.forEach(function (ele, index) {
  bson[index] = {
    name: ele.split('.')[0],
    link: '/player?name=' + ele + '&index=' + index
  }
})
// const bson = jsonfile.readFileSync(path.join(__dirname, '../bson/magnet.json'))
// Object.keys(bson).forEach(function(value){
//     movies[value] = bson[value]
// })
router.get('/', function (req, res, next) {
  const name = req.param('name')
  const index = req.param('index')
  if (name && index && videos[index] === name) {
    res.render('player', { title: 'miniPlayer', name: bson[index].name, source: '/videos/' + name})
  } else {
    res.render('player', {title: 'miniPlayer'})
  }
})
  .get('/list', function (req, res, next) {
    res.render('videolist', { movies: bson })
  })

module.exports = router
