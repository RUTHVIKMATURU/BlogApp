const exp = require('express')
const userApp =exp.Router()
const expressasynchandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')
//create new user

userApp.post('/user',expressasynchandler(createUserOrAuthor));
//reading all articles

userApp.get('/articles',expressasynchandler(async(req,res)=>{
  const articlesList=await Article.find({isArticleActive:true})
  res.status(200).send({message:"Articles List",pavload:articlesList})
}))

//add comment by article id
userApp.put('/comment/:articleId',expressasynchandler(async(req,res)=>{
  const commentObj=req.body;
  const articlewithComments=await Article.findOneAndUpdate(
    {articleId:req.params.articleId},
    {$push:{comments:commentObj}},
    {returnOriginal:false})
  res.status(200).send({message:"Comment Added",pavload:articlewithComments})
}));
module.exports=userApp;