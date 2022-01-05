const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy //和一般的引用不太一樣，需要再多傳入一個 Strategy 物件
const User = require('../models/user')//載入 User model

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) { //user不存在
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) { //user存在，但密碼不正確
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        return done(null, user) //使用者存在，且密碼一樣，登入成功
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