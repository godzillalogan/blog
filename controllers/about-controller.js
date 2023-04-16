const User = require('../models/user');

const aboutController = {
  aboutPage: async (req, res) => {
    const users = await User.find().lean()
    .sort({createdAt:'asc'})
    res.render('about',{ users })
  },
}



module.exports = aboutController
