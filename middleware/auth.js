module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) { //req.isAuthenticated() 是 Passport.js 提供的函式
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！(`o´)')
    res.redirect('/users/login')
  }
}