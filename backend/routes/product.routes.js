import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", addNewProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
