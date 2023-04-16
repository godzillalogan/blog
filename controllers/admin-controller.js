const { upload } = require('imgur-node-api');
const Article = require('../models/article');
const Category = require('../models/category');
const User = require('../models/user');
const Contact = require('../models/contact');

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  ////article
  getArticles: async (req, res) => {
    const articles = await Article.find().lean()
    .sort({createdAt:'desc'})
    res.render('admin/articles',{articles})
  },
  newArticle: async (req, res) => {
   const categories = await Category.find().lean()
    .sort({createdAt:'desc'})
    res.render('new',{article:new Article(),categories})
  },
  createArticle: async (req, res) => {
  
    try{
      const {title,category,description,markdown} = req.body 
      const{file} = req

      // console.log('file:',file)
      // markdown = markdown.replace(/\s+\r\n/g, "\n\r"); //正則表達式
      if (file){
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path,(err, img) =>{
          Article.create({...req.body, image: file ? img.data.link: null})
        })
      }else{
        Article.create({...req.body})
      }
      res.redirect('/admin/articles')
    } catch(e){
      console.log(e)
      res.render('admin/articles',{ article })
    }
  },
  editArticlePage: async (req, res) => {
     try{
      const _id = req.params.id
      const article =  await Article.findOne({ _id}).lean()
      const categories = await Category.find().lean().sort({createdAt:'desc'})
      // console.log('article.markdown:',article.markdown)
      // const newArticle = article.markdown.replace(/\s+/g, '')
      // console.log('newArticle:',newArticle)
      // console.log('article:', article)
      // console.log('article.markdown:', article.markdown)  
      article.markdown = article.markdown.replace(/\s+\r\n/g, "\n\r"); //正則表達式
      res.render('edit', { article,categories})
      }catch{
        console.log(e)
        res.redirect(`/articles/edit/:id`)
    }
  },
  editArticle: async (req, res) => {
      try{
          const _id = req.params.id
          const { title,description,markdown,category } = req.body
          const { file } = req // 把檔案取出來
          const article = await Article.findOne({ _id})
        if (file){
          // const filePath = await imgurFileHandler(file) // 把檔案傳到 file-helper 處理 
          imgur.setClientID(IMGUR_CLIENT_ID)
          imgur.upload(file.path,async (err, img) =>{
          // Article.update({...req.body, image: file ? img.data.link: article.image})
          article.title = title
          article.description = description
          article.markdown = markdown
          article.category = category
          article.image = img.data.link

          article.markdown = article.markdown.replace(/\s+\r\n/g, "\n\r"); //正則表達式
          await article.save()
          })
        }else{
          article.title = title
          article.description = description
          article.markdown = markdown
          article.category = category
          article.markdown = article.markdown.replace(/\s+\r\n/g, "\n\r"); //正則表達式 
          await article.save()
        }
        res.redirect('/admin/articles')
      }catch(e){
        console.log(e)
        res.redirect(`/admin/articles`)
      }
      // const {title,description,markdown} = req.body   //和new一樣才能將markdown轉成html
      //   Article.create({...req.body})
      //   res.redirect('/')
      },
  deleteArticle: async (req, res) => {
    const _id = req.params.id
    return Article.findOne({ _id})
    .then(article => article.remove())
    .then(() => res.redirect('/admin/articles'))
    .catch(error => console.log(error))
  },
  /////user
  getUsers: async (req, res) => {
    const users = await User.find().lean()
    .sort({createdAt:'asc'})
    res.render('admin/users',{users})
  },
  editUser:async (req, res) => {
  
    try{
      const _id = req.params.id
      const { name,avatar,introduction } = req.body
      const { file } = req // 把檔案取出來
      const user = await User.findOne({ _id})
      if (file){
        // const filePath = await imgurFileHandler(file) // 把檔案傳到 file-helper 處理 
        
        imgur.setClientID(IMGUR_CLIENT_ID)
          imgur.upload(file.path,async (err, img) =>{
            // Article.update({...req.body, image: file ? img.data.link: article.image})
            user.name = name
            // user.cover = filePath || user.cover
            user.avatar = img.data.link
            user.introduction = introduction
            await user.save()
          })
      }else{
        user.name = name
        // user.cover = filePath || user.cover
        // user.avatar = img.data.link
        user.introduction = introduction
        await user.save()
      }
      res.redirect('/about')
      }catch(e){
        console.log(e)
        res.redirect(`/admin/users`)
      }
      // const {title,description,markdown} = req.body   //和new一樣才能將markdown轉成html
      //   Article.create({...req.body})
      //   res.redirect('/')
  },
  ////categories
  getCategories: async (req, res) => {
    const categories = await Category.find().lean()
    .sort({createdAt:'desc'})
    res.render('admin/categories',{categories})
  },
  newCategoriesPage: async (req, res) => {
    res.render('newCategory')
  },
  newCategory: async (req, res) => {
    const errors = []
    try{
      const {categoryName,categoryEnName} = req.body
      const categoryExit = await Category.findOne({categoryName}).lean() //去資料庫找是否已經有資料
      const categoryEnNameExit = await Category.findOne({categoryEnName}).lean() //去資料庫找是否已經有資料
      if(categoryExit || categoryEnNameExit){ //if去資料庫已經有資料
        errors.push({message:'已經有這種類了 「(°ヘ°)'})
        return res.render('newCategory',{errors})
      }
      Category.create({...req.body})
      res.redirect('/admin/categories')
    } catch(e){
      console.log(e)
      res.render('admin/categories')
    }
  },
  deleteCategory: async (req, res) => {
    const _id = req.params.id
    return Category.findOne({ _id})
      .then(category => category.remove())
      .then(() => res.redirect('/admin/categories'))
      .catch(error => console.log(error))
  },
  ////Contacts
  getContacts: async (req, res) => {
    const contacts = await Contact.find().lean()
    .sort({createdAt:'asc'})
    res.render('admin/contacts',{contacts})
  },
  deleteContact: async (req, res) => {
    const _id = req.params.id
    return Contact.findOne({ _id})
    .then(contact => contact.remove())
    .then(() => res.redirect('/admin/contacts'))
    .catch(error => console.log(error))
  },

}



module.exports = adminController