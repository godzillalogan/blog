const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Schema，Schema是mongoose提供的定義資料結構的方式
const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default : Date.now
  }
})

module.exports = mongoose.model('Contact', contactSchema)