var express = require('express')
var mongoose = require('mongoose')
var Store = require('../models')
var router = express.Router()

mongoose.connect('mongodb://localhost/jbstore')

mongoose.connection.once('open', console.log.bind(console, 'opened'))

router.get('/', async function(req, res, next) {
    const result = await Store.paginate({}, {offset: 0, limit: 20})
    res.render('board', { title: '预览', seeds: result.docs })
}).get('/page/:page', async function(req, res, next) {
    const count = Number(req.params.page) - 1
    const result = await Store.paginate({}, {offset: 20*count, limit: 20})
    res.render('board', { title: '预览', seeds: result.docs })
}).get('/detail', function(req, res, next) {
    const { id } = req.query
    console.log(id)
    Store.findById(id, 'info magnet', function(err, doc){
        if (!err) {
            res.send(doc)
        }
    })
})

module.exports = router