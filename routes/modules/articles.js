const express = require('express');
const articleController = require('../../controllers/articles-controller')
const router = express.Router();

////articles
router.get('/', articleController.getArticles) 
router.get('/filter/:categoryEnName', articleController.filterArticle)
//read特定article
router.get('/:_id', articleController.readArticle)

module.exports = router;