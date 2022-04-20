const express = require('express')
const router = express.Router()
const User = require('../../models/user');
const passport = require('passport') //// 引用 passport
const bcrypt = require('bcryptjs')

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
    // const user = await User.findOne({ email }) //找到email一樣的
    const user = await User.findOne({}) 
    console.log('user:',user)
    //如果已經註冊:退回原本畫面
    if(user){
      errors.push({ message: '管理員只能有一個人喔( ಠ ಠ )' })
      res.render('register',{ 
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }else{
      //https://www.npmjs.com/package/bcryptjs，官方的寫法genSaltSync
      const salt = bcrypt.genSaltSync(10)// 產生「鹽」，並設定複雜度係數為 10
      const hash = bcrypt.hashSync(password, salt)
      // console.log('salt:',salt)
      // console.log('hash:',hash)
      await User.create({
        name,
        email,
        password : hash // 用雜湊值取代原本的使用者密碼
      })
      res.redirect('/users/login')
    }
  }catch(err){
    console.log(err)
  }
})

module.exports = router