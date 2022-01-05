const express = require('express')
const router = express.Router()
const User = require('../../models/user');

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async(req, res) =>{
  const {name, email, password, confirmPassword} = req.body // 取得註冊表單參數
  try{
    const user = await User.findOne({ email })
    //如果已經註冊:退回原本畫面
    if(user){
      console.log('User already exists.')
      res.render('register',{ 
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
      res.redirect('/')
    }
  }catch(err){
    console.log(err)
  }
})

module.exports = router