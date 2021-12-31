const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req,res)=>{
  res.render('new',{article:new Article()})
})




//Create
router.post('/', async (req,res)=>{
  console.log('哈哈有到這嗎')
  console.log(req.body)
  // const article = new Article({
  //     title: req.body.title,
  //     description: req.body.description,
  //     markdown: req.body.markdown
  // });
  try{
    const {title,description,markdown} = req.body
    Article.create({...req.body})
    res.redirect('/')
  } catch(e){
    console.log(e)
    res.render('articles/new',{ article })
  }
})

//read特定article
router.get('/:id', async (req,res)=>{
  try{
    const article = await Article.findById(req.params.id).lean()
    if(article===null) res.redirect('/')
    res.render('show', {article})
  }catch(e){
    console.log(e)
  }
})

////Update
//到edit頁
router.get('/edit/:id', async (req, res) => {
  const _id = req.params.id
  return Article.findOne({ _id})
    .lean()
    .then((article) => res.render('edit', { article}))
    .catch(error => console.log(error))
})

//edit article
router.put('/:id', (req, res)=>{
  const _id = req.params.id
  const { title,description,markdown } = req.body
  return Article.findOne({ _id})
    .then(article => {
      article.title = title
      article.description = description
      article.markdown = markdown
      return article.save()
    })
    .then(() => res.redirect(`/articles/${_id}`))
    .catch(error => console.log(error))
})


//delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Article.findOne({ _id})
    .then(article => article.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router;