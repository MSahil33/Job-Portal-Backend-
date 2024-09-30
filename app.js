// Importing all the required modules or packages
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
// Files Imports
import connectDB from "./src/config/db.config.js";
import { userRegister } from "./src/controllers/users.controller.js";

// App object
const app = express()

// Configuring DotEnv app
dotenv.config()

// Connecting MongoDB 
connectDB();

// -----Middlewares
app.use(express.json()); // Using a middleware to use json data
app.use(cors()); //Using a middlware for cross-origin(Cors) 

// Getting port variable from the env file
const port = process.env.PORT || 8080

// User Routes
app.use("/api/v1/user",userRegister);


app.listen(port, () => {
  console.log(`App Running in "${process.env.DEV_MODE} Mode" on port : ${port}`);
})