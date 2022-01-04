const express = require('express')
// const bodyParser = require('body-parser')  //新版express以內建body-parser
const { engine } = require('express-handlebars');
const app = express()
const PORT = 3000
const methodOverride = require('method-override')  // 載入 method-override
const routes = require('./routes')


require('./config/mongoose')

app.use(express.urlencoded({ extended:false}))  //Express 升級到了 4.17.1。升級後的 Express 已經內建了 body-parser 這個工具 
// setting body-parser
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))// 設定每一筆請求都會透過 methodOverride 進行前置處理

app.engine('hbs', engine({extname: '.hbs',helpers: require('./hbsHelpers/handlebarsHelpers')}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(routes)



app.listen(PORT, ()=>{
  console.log('App is running on http://localhost:3000')
})






//handlebars改版後
// const { engine } = require('express-handlebars');





// const exphbs = require('express-handlebars');

// app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', 'hbs')