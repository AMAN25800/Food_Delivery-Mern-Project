import mongoose from "mongoose";
import 'dotenv/config';
export const connectDB=async ()=>{
    const url=process.env.MONGODB_URL;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected");
}
