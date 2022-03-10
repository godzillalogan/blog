const express = require('express')
const router = express.Router()
const Category = require('../../models/category');
const Article = require('../../models/article')

router.get('/', async (req,res)=>{
  const categories = await Category.find().lean().sort({createdAt:'desc'})
  const articles = await Article.find().lean()
  .sort({createdAt:'desc'})
  res.render('index',{ articles, categories })
})


module.exports = router

