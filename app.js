// Importing all the required modules or packages
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";

// App object
const app = express()

// Configuring DotEnv app
dotenv.config()

// Connecting MongoDB 
connectDB();

// Getting port variable from the env file
const port = process.env.PORT || 8080


app.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1>");
})

app.listen(port, () => {
  console.log(`App Running in "${process.env.DEV_MODE} Mode" on port : ${port}`);
})