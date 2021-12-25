const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (reu,res)=>{
  res.send('hello Blog')
})

app.listen(PORT, ()=>{
  console.log('App is running on http://localhost:3000')
})