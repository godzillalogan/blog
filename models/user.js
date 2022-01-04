const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now //想要捕捉到「使用者註冊的當下時間」，因此可以用 Date.now
    //Date.now沒加括號時，代表你傳入的是函式本身，而加了括號的話Date.now()，代表你直接呼叫了這個函式，並傳入函式的回傳值。
  }
})
module.exports = mongoose.model('User', userSchema)