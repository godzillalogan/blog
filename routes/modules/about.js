const express = require('express');
const User = require('../../models/user');
const router = express.Router();



////user
router.get('/', async (req,res)=>{
  const users = await User.find().lean()
  .sort({createdAt:'asc'})
  console.log(users)
  res.render('about',{ users })
})


module.exports = router;