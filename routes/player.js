var express = require('express')
var path = require('path')
var jsonfile = require('jsonfile')
var router = express.Router()

const movies = []
const bson = jsonfile.readFileSync(path.join(__dirname, '../bson/magnet.json'))
// Object.keys(bson).forEach(function(value){
//     movies[value] = bson[value]
// })
router.get('/', function(req, res, next) {
    res.render('player', {title: 'miniPlayer'})
})
.get('/list', function(req, res, next){
    res.render('videolist', { movies: bson })
})

module.exports = router