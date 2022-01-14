const express = require('express')
const router = express.Router()
const User = require('../../models/user');
const passport = require('passport') //// 引用 passport

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', passport.authenticate('local',{
  successRedirect: '/admin/articles',  //成功的時候去哪裡
  failureRedirect: '/users/login' //失敗的時候去哪裡
}))

router.get('/logout', (req, res) => {
  req.logout() //Passport.js 提供的函式，會幫你清除 session
  req.flash('success_msg', '你已經成功登出。٩(^ᴗ^)۶')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async(req, res) =>{
  try{
    const {name, email, password, confirmPassword} = req.body // 取得註冊表單參數
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。(¬_¬)' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！ಠ_ಠ' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const user = await User.findOne({ email })
    //如果已經註冊:退回原本畫面
    if(user){
      errors.push({ message: '這個 Email 已經註冊過了。( ಠ ಠ )' })
      res.render('register',{ 
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }else{
      User.create({
        name,
        email,
        password
      })
      res.redirect('/users/login')
    }
  }catch(err){
    console.log(err)
  }
})

module.exports = router