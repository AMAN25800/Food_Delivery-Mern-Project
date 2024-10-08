import mongoose from "mongoose";
const LocationSchema=new mongoose.Schema({
email:{type:String},
address:{type:String},
  
    
    
  })
  const locationData=mongoose.model("userLocation",LocationSchema);
  export default locationData;