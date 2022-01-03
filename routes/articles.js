const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req,res)=>{
  res.render('new',{article:new Article()})
})

//Create
router.post('/', async (req,res)=>{
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
router.get('/:_id', async (req,res)=>{ //:id 改成title,不需要使用slug,https://stackoverflow.com/questions/8573586/how-can-i-use-a-slug-with-express-and-node-js
  try{
    const article = await Article.findOne({_id:req.params._id}).lean() //findById(req.params.id) 改成findOne({slug:req.params.slug})
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
  // const {title,description,markdown} = req.body   //和new一樣才能將markdown轉成html
  //   Article.create({...req.body})
  //   res.redirect('/')
    .then((article) => res.redirect(`/articles/${article._id}`))
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