import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";
import Product from "./models/product.model.js";

import productRoute from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows JSON data in the req.body

app.use("/api/products", productRoute);

app.listen(5000, function () {
  connectToDatabase();
  console.log("Server started on http://localhost:5000");
});
