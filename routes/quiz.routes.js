const express=require("express");
const {QuizModel}=require("../models/quiz.model");

const quizRouter=express.Router();

quizRouter.post("/",async (req,res)=>{
 const quiz=req.body;
 try {
  const newQuiz=new QuizModel(quiz);
  await newQuiz.save();
  res.send("quiz added")
 } catch (error) {
  res.send(error.message)
 }
})

module.exports={quizRouter}