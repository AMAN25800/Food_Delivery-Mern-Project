import mongoose from "mongoose";

const usermodel=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
  
 
},)
const userModel=mongoose.model.user || mongoose.model("user",usermodel);
export default userModel;