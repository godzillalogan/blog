const express = require('express');
const Contact = require('../../models/contact');
const router = express.Router();



////user
router.get('/', async (req,res)=>{
  res.render('contact')
})

//Create
router.post('/', async (req,res)=>{
  try{
    console.log("有到contact嗎")
    const {name,email,message} = req.body
    Contact.create({...req.body})
    res.redirect('/contact')
  } catch(e){
    console.log(e)
    res.render('/contact')
  }
})



module.exports = router;