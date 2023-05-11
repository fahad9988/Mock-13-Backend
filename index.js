const express=require("express");
const cors=require("cors");
require("dotenv").config();

const {connection}=require("./configs/db");

const {userRouter}=require("./routes/user.routes");
const {quizRouter}=require("./routes/quiz.routes");

const {authenticator}=require("./middlewares/authenticator")

const app=express();

app.use(express.json());
app.use(cors({
 origin:"*"
}));

app.get("/",(req,res)=>{
 res.send("Welcome to Quiz Database");
});

app.use("/users",userRouter);
app.use(authenticator);
app.use("/quiz",quizRouter);

app.listen(process.env.PORT,async ()=>{
 try {
  await connection;
  console.log("connected to db")
 } catch (error) {
  console.log("Not connected to DB");
 }

 console.log(`Server started at port ${process.env.PORT}`)
})
