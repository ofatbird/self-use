const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const storeSchema = mongoose.Schema({
  number: {
    type: String,
    index: true
  },
  pic: String,
  info: String,
  magnet: String
})
storeSchema.plugin(mongoosePaginate)

const Store = module.exports = mongoose.model('Store', storeSchema)
