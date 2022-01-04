const express = require('express')
const router = express.Router()
const Article = require('../../models/article')

router.get('/', async (req,res)=>{
  const articles = await Article.find().lean()
  .sort({createdAt:'desc'})
  res.render('index',{ articles })
})


module.exports = router

