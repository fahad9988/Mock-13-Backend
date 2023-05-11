const express=require("express");
const {UserModel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/register",async (req,res)=>{
 const {email,password}=req.body;
 try {
  const exist=await UserModel.find({email});
  if(exist.length>0){
   res.send({"msg":"User already registered, please login"});
  }else{
   bcrypt.hash(password, 5,async function(err, secure_passsword) {
    if(err){
     res.send({"err":error.message});
    }else{
     const user=new UserModel({email,password:secure_passsword});
     await user.save();
     res.send({"msg":"User registered successfully"});
    }
});
  }
 } catch (error) {
  res.send({"err":error.message});
 }
});

userRouter.post("/login",async (req,res)=>{
 const {email,password}=req.body;
 try {
  const user=await UserModel.find({email});
  if(user.length>0){
   bcrypt.compare(password, user[0].password, function(err, result) {
    if(result){
     var token = jwt.sign({ userID: user[0]._id }, 'masai');
     res.send({"msg":"User logged in successfully","token":token,"email":email});
    }else{
     res.send({"msg":"Invalid credentials"});
    }
});
  }else{
   res.send({"msg":"Invalid credentials"});
  }
 } catch (error) {
  res.send({"err":error.message});
 }
});


module.exports={
 userRouter
}