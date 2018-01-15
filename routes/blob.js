var fs = require('fs')
var path = require('path')
var toArrayBuffer = require('to-arraybuffer')
var videoBuffer = fs.readFileSync(path.join(__dirname,'../public/videos/havana.mp4'))

console.log(toArrayBuffer(videoBuffer))