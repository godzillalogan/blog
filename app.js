const express = require('express')
const session = require('express-session')
// const bodyParser = require('body-parser')  //新版express以內建body-parser
const { engine } = require('express-handlebars');
const app = express()
const PORT = 3000
const methodOverride = require('method-override')  // 載入 method-override
const routes = require('./routes')

const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後

require('./config/mongoose')

app.use(express.urlencoded({ extended:false}))  //Express 升級到了 4.17.1。升級後的 Express 已經內建了 body-parser 這個工具 
// setting body-parser
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(express.static('public'))//靜態檔案

app.engine('hbs', engine({extname: '.hbs',helpers: require('./hbsHelpers/handlebarsHelpers')}));
app.use(session({
  secret: 'ThisIsMySecret',//這個參數是 session 用來驗證 session id 的字串。這組字串由伺服器設定，不會洩露給客戶端。
  resave: false,//當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true//強制將未初始化的 session 存回 session store。
}))
app.set('view engine', 'hbs');
app.set('views', './views');

usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前

app.use(routes)



app.listen(PORT, ()=>{
  console.log('App is running on http://localhost:3000')
})






//handlebars改版後
// const { engine } = require('express-handlebars');





// const exphbs = require('express-handlebars');

// app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', 'hbs')