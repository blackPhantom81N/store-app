import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import productRoute from "./routes/product.routes.js";
import connectToDatabase from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows JSON data in the req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);

app.listen(5000, function () {
  connectToDatabase();
  console.log("Server started on http://localhost:5000");
});
