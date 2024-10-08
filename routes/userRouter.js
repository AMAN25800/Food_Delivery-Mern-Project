import express from "express";
import {loginUser,registeredUser, updatePassword} from '../controller/userData.js';
const userRouter=express.Router();
userRouter.post("/adduser",registeredUser);
userRouter.post("/login",loginUser);
userRouter.put('/update-password',updatePassword)





export default userRouter;
