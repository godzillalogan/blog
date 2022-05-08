const fs = require('fs') // 引入 fs 模組, fs 模組是 Node.js 提供專門來處理檔案的原生模組


//載入 imgur 套件
const imgur = require('imgur-node-api')

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientID(IMGUR_CLIENT_ID)

const localFileHandler =  file => { // file 是 multer 處理完的檔案
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null) 
    const fileName = `upload/${file.originalname}`
    return fs.promises.readFile(file.path)
      .then(data => fs.promises.writeFile(fileName, data))
      .then(() => resolve(`/${fileName}`))
      .catch(err => reject(err))
  })
}
//目前這邊不需要，因為移去routes/modules/admin.js了
const imgurFileHandler = async file => {
  try{
    if (!file) return null
    return img = await imgur.upload(file.path)
  }catch(err) {
    console.log(err)
  }
  



  // return new Promise((resolve, reject) => {
  //   if (!file) return resolve(null)
  //   imgur.uploadFile(file.path)
  //     .then(img => {
  //       // resolve(img?.link || null) // 檢查 img 是否存在
  //       resolve(img ? img.link : null)
  //     })
  //     .catch(err => reject(err))
  // })
}
module.exports = {
  localFileHandler,
  imgurFileHandler  //img
}