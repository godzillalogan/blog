const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const articleRouter = require('./modules/articles')

router.use('/',home)
router.use('/articles',articleRouter)



// 匯出路由器
module.exports = router