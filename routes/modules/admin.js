const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer') // 載入 multer
const { imgurFileHandler } = require('../../helpers/file-helpers') // 將 file-helper 載進來

//載入 imgur 套件
const imgur = require('imgur-node-api');
const { getContacts } = require('../../controllers/admin-controller');
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


//All articles
router.get('/articles', adminController.getArticles)
//new articles
router.get('/articles/new', adminController.newArticle)
router.post('/articles', upload.single('image'), adminController.createArticle)
////Update
//到edit頁
router.get('/articles/edit/:id', adminController.editArticlePage)
//edit article
router.put('/articles/:id', upload.single('image'), adminController.editArticle)
//delete
router.delete('/articles/:id', adminController.deleteArticle)


////user
//到user頁
router.get('/users', adminController.getUsers)
//edit user
router.put('/users/:id', upload.single('avatar'), adminController.editUser)


//categories
router.get('/categories', adminController.getCategories)
router.get('/categories/new', adminController.newCategoriesPage)
//Create
router.post('/categories', adminController.newCategory)
//delete
router.delete('/categories/:id', adminController.deleteCategory)


////contact
router.get('/contacts', adminController.getContacts)
////contact   //delete
router.delete('/contacts/:id', adminController.deleteContact)


module.exports = router