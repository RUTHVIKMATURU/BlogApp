const exp = require('express')
const authorApp =exp.Router()
const userauthor=require('../models/userAuthorModel')
const expressasynchandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')
const {requireAuth,clerkMiddleware}=require('@clerk/express')
require('dotenv').config()

//create new author
authorApp.post('/author',expressasynchandler(createUserOrAuthor));

//create new article
authorApp.post('/article',expressasynchandler(async(req,res)=>{
  //get new article
  const newArticleObj=req.body;
  const newArticle =Article(newArticleObj);
  const articleObj=await newArticle.save();
  res.status(201).send({message:"Article Published",pavload:newArticleObj})
}))



//read all articles
authorApp.get('/articles',expressasynchandler(async(req,res)=>{
    const articlesList=await Article.find({isArticleActive:true})
    res.status(200).send({message:"articles",pavload:articlesList})
}))
authorApp.get('/unauthorised',(req,res)=>{
  res.send({message:"Unauthorised request ... plz login"})
})
//update article
authorApp.put('/article/:articleId',expressasynchandler(async(req,res)=>{
  //GET MODIFIED ARTICLE
  const modifiedArticle =req.body;
  //update
  const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,
    {...modifiedArticle},
    {returnOriginal:false})
  res.status(200).send({message:"Article modified",pavload:dbRes})
}))

//delete article
authorApp.put('/articles/:articleId',expressasynchandler(async(req,res)=>{
  //GET MODIFIED ARTICLE
  const modifiedArticle =req.body;
  //update
  const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,
    {...modifiedArticle},
    {returnOriginal:false})
  res.status(200).send({message:"Article deleted",pavload:latestArticle})
}))
module.exports=authorApp;