import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  console.log(process.env.MONGO_URI);
});

app.listen(5000, function () {
  connectToDatabase();
  console.log("Server started on http://localhost:5000");
});
