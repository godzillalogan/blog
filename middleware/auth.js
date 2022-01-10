module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) { //req.isAuthenticated() 是 Passport.js 提供的函式
      return next()
    }
    res.redirect('/users/login')
  }
}