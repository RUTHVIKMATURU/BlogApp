const exp = require('express')
const authorApp =exp.Router()
const userauthor=require('../models/userAuthorModel')

authorApp.get('/',async(req,res)=>{
  let authorslist=await userauthor.find()
  res.send({message:"authors",pavload:authorslist})
})

module.exports=authorApp;