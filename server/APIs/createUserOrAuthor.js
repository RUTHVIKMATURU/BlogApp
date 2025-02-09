const UserAuthor=require('../models/userAuthorModel')
async function createUserOrAuthor(req,res) {
  //logic to create user or author
    //get user or author from request
    const newUserAuthor=req.body;
    //find user by email id
    const userIndb=await UserAuthor.findOne({email:newUserAuthor.email})
    //if user or author existed
    if(userIndb!=null){
      //check with role
      if(newUserAuthor.role==userIndb.role){
        res.status(200).send({message:newUserAuthor.role,payload:userIndb})
      }else{
        res.status(200).send({message:"Invalid role"})
      }
    }else{
      let newUser =new UserAuthor(newUserAuthor);
      let newUserOrAuthorDoc=await newUser.save();
      res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
    }
}
module.exports=createUserOrAuthor;