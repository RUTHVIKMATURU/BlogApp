const exp = require('express')
const app =exp()
const mongoose =require('mongoose')
require('dotenv').config();//process.env
const port =process.env.PORT||4000;
const userApp=require('./APIs/userApi')
const authorApp=require('./APIs/authorApi')
const adminApp=require('./APIs/adminApi')
const cors=require('cors')
app.use(cors())
//db connect
mongoose.connect(process.env.DBURL)
.then(()=>{
  console.log("DB connection success")
  app.listen(port,()=>{console.log(`server listeing on port ${port} ..`)})
})
.catch(err=>console.log("Error in DB connection",err))
app.use(exp.json())
app.use('/user-api',userApp);
app.use('/author-api',authorApp);
app.use('/admin-api',adminApp);

// error handler
app.use((err,req,res,next)=>{
  console.log("error object: ",err);
  res.send({message:err.message})
})