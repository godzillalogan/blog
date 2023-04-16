const express = require('express');
const router = express.Router();
const aboutController = require('../../controllers/about-controller')


////user
router.get('/', aboutController.aboutPage)


module.exports = router;