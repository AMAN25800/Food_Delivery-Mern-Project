import express from 'express';
import { addFood,listFood } from '../controller/FoodController.js'; // Ensure this path is correct
const routerData = express.Router();

// Post route to add a user
routerData.post("/addfood", addFood); // This will map to "/api/add" because of the prefix in index.js
routerData.get("/listfood",listFood)
export default routerData;
