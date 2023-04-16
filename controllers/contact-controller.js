const Contact = require('../models/contact');



const contactController = {
  contactPage: async (req, res) => {
    res.render('contact')
  },
  createContact: async (req, res) => {
    try{
      const {name,email,message} = req.body
      Contact.create({...req.body})
      res.redirect('/contact')
    } catch(e){
      console.log(e)
      res.render('/contact')
    }
  },
}



module.exports = contactController