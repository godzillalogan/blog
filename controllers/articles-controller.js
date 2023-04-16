const Article = require('../models/article');
const Category = require('../models/category');


const articleController = {
  getArticles: async (req, res) => {
    //:id 改成title,不需要使用slug,https://stackoverflow.com/questions/8573586/how-can-i-use-a-slug-with-express-and-node-js
    try{
      const articles = await Article.find().lean().sort({createdAt:'desc'})
      const categories = await Category.find().lean().sort({createdAt:'desc'})
      res.render('articles',{ articles , categories})
    }catch(e){
      console.log(e)
    }
  },
  filterArticle: async (req, res) => {
    try{
      const currentCategory = req.params.categoryEnName
      const categories = await Category.find().lean().sort({createdAt:'desc'})    
      const articles = await Article.find({category:currentCategory}).lean().sort({createdAt:'desc'})
      res.render('articles',{ articles , categories, currentCategory})
    }catch(e){
      console.log(e)
    }
  },
  readArticle: async (req, res) => {
   //:id 改成title,不需要使用slug,https://stackoverflow.com/questions/8573586/how-can-i-use-a-slug-with-express-and-node-js
    try{
      const article = await Article.findOne({_id:req.params._id}).lean() //findById(req.params.id) 改成findOne({slug:req.params.slug})
      console.log("article.title:",article.title)
      if(article===null) res.redirect('/')
      res.render('show', {article})
    }catch(err){
      console.log(err)
    }
  },
}


module.exports = articleController