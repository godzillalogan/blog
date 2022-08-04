const express = require('express')
const router = express.Router()
const Category = require('../../models/category');
const User = require('../../models/user');
const Article = require('../../models/article')

router.get('/', async (req,res)=>{
  const categories = await Category.find().lean().sort({createdAt:'desc'})
  const articles = await Article.find().lean()
  const users = await User.find().lean()
  .sort({createdAt:'desc'})
  res.render('index',{ articles, categories ,users})
})


module.exports = router

