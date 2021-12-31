const mongoose = require('mongoose')



// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true  })
// mongoose.connect('MONGODB_URI',{ useNewUrlParser: true,useUnifiedTopology: true  })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功，open只會發生一次，once也只執行一次
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db