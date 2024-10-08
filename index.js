import express from "express";
import cors from "cors";
import { connectDB } from "./database/db.js";
import routerData from "./routes/route.js"; // importing the router
import userRouter from "./routes/userRouter.js";
import cookieParser from 'cookie-parser';
import axios from 'axios';
import  nodemailer from 'nodemailer';

import 'dotenv/config'
import locationRouter from "./routes/locationRoute.js";
// App configuration
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors())
app.use(cookieParser());

// Database connection
connectDB();

// API endpoints
app.use("/", routerData); // This means all routes in route.js will be prefixed with "/api"
app.use("/",userRouter);
app.use("/",locationRouter)

// Root route
app.get("/", (req, res) => {
  
  
  res.send("API is working");
 


 
});
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
      user: 'shah.aman5772719@gmail.com', // Your email
      pass: 'urks ayyf jrqm hyfn' // Your email password or app password
  }
});

// Endpoint to send an email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  const generateotp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  const otp=generateotp();

  const mailOptions = {
      from: email,
      to: 'shah.aman5772719@gmail.com', // Your receiving email
      subject: `FOODPOINT`,
      text: message+otp+"\n\nThank YOu",
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).json({ status: 'fail', error });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ status: `success${otp}` });
  });
});

// Server listening
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
