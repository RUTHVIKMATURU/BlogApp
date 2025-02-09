const exp = require('express')
const adminApp =exp.Router()
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor =require('./createUserOrAuthor')
const userAuthor = require('../models/userAuthorModel');
adminApp.post('/admin',expressAsyncHandler(createUserOrAuthor))

adminApp.get('/userauthors',expressAsyncHandler(async(req,res)=>{
  let listOfUsersAuthors=await userAuthor.find({$or:[{role:'user'},{role:'author'}]})
  res.send({message:"users and authors",payload:listOfUsersAuthors})
}))
//user block or unblock
adminApp.put('/userauthor',expressAsyncHandler(async (req, res) => {

  const modifieduser = req.body;
  const newuser = await userAuthor.findByIdAndUpdate(modifieduser._id,
      { ...modifieduser },
      { returnOriginal: false })
  res.status(200).send({ message: "user updated", payload: newuser })
}))
module.exports=adminApp;