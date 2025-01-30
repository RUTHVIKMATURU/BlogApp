const exp = require('express')
const userApp =exp.Router()
const userauthor=require('../models/userAuthorModel')

userApp.get('/users',async(req,res)=>{
  let userslist=await userauthor.find()
  res.send({message:"users",pavload:userslist})
})

module.exports=userApp;