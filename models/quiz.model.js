const mongoose=require("mongoose");

const quizSchema=mongoose.Schema({
quiz:{type:Object,required:true},
leaderboard:{type:Array,required:true},
userID:String
});

const QuizModel=mongoose.model("quizze",quizSchema);

module.exports={
 QuizModel
}