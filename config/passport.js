const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy //和一般的引用不太一樣，需要再多傳入一個 Strategy 物件
const User = require('../models/user')//載入 User model
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ 
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true, //當passReqToCallback設定為true時，request object將作為參數傳入的callback function，這表示當LocalStrategy呼叫 callback時，可以透過參數傳遞得到 req物件控制權。
    session: false
  }, (req,email, password, done) => { //加上req
    User.findOne({ email })
      .then(user => {
        if (!user) { //user不存在
          return done(null, false,  req.flash("warning_msg", "This email is not registered! (✖╭╮✖)"))
        }
        //第一個參數是使用者的輸入值，而第二個參數是資料庫裡的雜湊值，bcrypt 會幫我們做比對，並回傳布林值，在文中我們用 isMatch 來代表。
        return bcrypt.compare(password,user.password).then(isMatch =>{
          if(!isMatch){
            return done(null, false,  req.flash("warning_msg", "Email or Password incorrect. (✖﹏✖)"))
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))//查詢 DB → 程式運作正常 → 回傳查找的結果 user
      .catch(err => done(err, null))//查詢 DB → 程式運作錯誤 → 回傳錯誤 → done(err, null)
  })
}