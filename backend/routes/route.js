import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByBrand,
  getBrands,
} from "../controllers/readData.js";
import { Signup } from "../controllers/authController.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/products", asyncHandler(getProducts));
router.get("/product/:id", asyncHandler(getProductById));
router.get("/brands", asyncHandler(getBrands));
router.get("/brand/:brand", asyncHandler(getProductsByBrand));
router.post("/signup", asyncHandler(Signup));

export default router;
