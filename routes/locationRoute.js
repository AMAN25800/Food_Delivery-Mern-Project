import express from 'express';
import { userLocation,getUserByEmail } from '../controller/LocationController.js'; // Ensure this path is correct

const locationRouter = express.Router();

// Post route to add a user
locationRouter.post("/savelocation", userLocation); // This will map to "/api/add" because of the prefix in index.js
locationRouter.post('/getusers',getUserByEmail);

export default locationRouter;
