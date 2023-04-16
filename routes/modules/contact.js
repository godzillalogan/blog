const express = require('express');
const contactController = require('../../controllers/contact-controller')
const router = express.Router();



////contace
router.get('/', contactController.contactPage) 
//Create
router.post('/', contactController.createContact) 



module.exports = router;