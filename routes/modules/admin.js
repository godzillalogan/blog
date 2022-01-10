const express = require('express')
const router = express.Router()
const Article = require('../../models/article');
const User = require('../../models/user');

router.get('/articles', async (req,res)=>{
  const articles = await Article.find().lean()
  .sort({createdAt:'desc'})
  res.render('admin/articles',{articles})
})

router.get('/articles/new', (req,res)=>{
  res.render('new',{article:new Article()})
})

//Create
router.post('/articles', async (req,res)=>{
  console.log(req.body)
  // const article = new Article({
  //     title: req.body.title,
  //     description: req.body.description,
  //     markdown: req.body.markdown
  // });
  try{
    const {title,description,markdown} = req.body
    Article.create({...req.body})
    res.redirect('/admin/articles')
  } catch(e){
    console.log(e)
    res.render('admin/articles',{ article })
  }
})


////Update
//到edit頁
router.get('/articles/edit/:id', async (req, res) => {
  const _id = req.params.id
  return Article.findOne({ _id})
    .lean()
    .then((article) => res.render('edit', { article}))
    .catch(error => console.log(error))
})

//edit article
router.put('/articles/:id', (req, res)=>{
  const _id = req.params.id
  const { title,description,markdown } = req.body
  return Article.findOne({ _id})
    .then(article => {
      article.title = title
      article.description = description
      article.markdown = markdown
      return article.save()
    })
  // const {title,description,markdown} = req.body   //和new一樣才能將markdown轉成html
  //   Article.create({...req.body})
  //   res.redirect('/')
    .then((article) => res.redirect(`/admin/articles`))
    .catch(error => console.log(error))
})

//delete
router.delete('/articles/:id', (req, res) => {
  const _id = req.params.id
  return Article.findOne({ _id})
    .then(article => article.remove())
    .then(() => res.redirect('/admin/articles'))
    .catch(error => console.log(error))
})


////user
router.get('/users', async (req,res)=>{
  const users = await User.find().lean()
  .sort({createdAt:'asc'})
  res.render('admin/users',{users})
})




module.exports = router