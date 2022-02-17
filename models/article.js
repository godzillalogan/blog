const mongoose = require('mongoose');
const marked = require('marked')
// const slugify = require('slugify')// conver something to our title , URL friendly
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
// const window = new JSDOM('').window;
// const dompurify = createDOMPurify(window);


const articleSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  description:{
    type:String,
  },
  category: {
    type: String,
    required: true
  },
  markdown:{
    type:String,
    require: true
  },
  createdAt:{
    type: Date,
    default : Date.now
  },
  // ,
  // slug:{
  //   type: String,
  //   require: true,
  //   unique: true
  // },
  image:{
    type: String
  },
  sanitizedHtml:{
    type: String,
    require: true
  }
})
//Pre middleware functions are executed one after another, when each middleware calls next
articleSchema.pre('validate',function(next){
  // if(this.title){
  //   console.log('有到slugify嗎')
  //   this.slug = slugify(this.title, {  //注意lower: true 會變成小寫，注意title這個不能打中文
  //   strict: true })
  // }
  if(this.markdown){
    console.log(marked.parse(this.markdown))
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))//解決bug,加上.parse就可以
  }
  // if (this.markdown) {
  //   console.log(htmlToText('<h1>大型機主</h1>'))
  //   console.log(marked.parse(this.markdown))
  //   this.htmlTurnToText = htmlToText(marked.parse(this.markdown));
  // }
  next()
})

module.exports = mongoose.model('Article', articleSchema)