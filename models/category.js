const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Schema，Schema是mongoose提供的定義資料結構的方式
const categorySchema = new mongoose.Schema({
  categoryName:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default : Date.now
  }
})

module.exports = mongoose.model('Category', categorySchema)