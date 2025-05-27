import fs from "fs";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import mongooseConnect from "../mongoConnect.js";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config({ path: "../.env" });

const productFilePath = "/Users/sakshamkshatri/sales-dashboard/data/products";
const PRODUCT_DATA_TIME = process.env.PRODUCT_DATA_TIME || 60000;

// Function to process a single file
const processProductFile = async (fileCounter) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(`${productFilePath}/products_${fileCounter}.csv`)
      .pipe(csvParser())
      .on("data", async (row) => {
        const productData = {
          productId: row.product_id,
          productName: row.product_name,
          brandName: row.brand_name,
          sellingPrice: row.selling_price,
          costPrice: row.cost_price,
          category: row.category,
          expiryDate: row.expiry_date,
          quantity: row.quantity,
        };

        try {
          const product = new Product(productData);
          await product.save();
        } catch (error) {
          console.error(
            `Error saving product from file ${fileCounter}:`,
            error
          );
        }
      })
      .on("end", () => {
        console.log(
          `Finished processing product file products_${fileCounter}.csv`
        );
        resolve();
      })
      .on("error", (error) => {
        console.error(
          `Error reading product file products_${fileCounter}.csv:`,
          error
        );
        reject(error);
      });
  });
};

const simlulateProductsProcessing = async () => {
  await mongooseConnect();

  for (let i = 1; i <= 10; i++) {
    setTimeout(async () => {
      console.log(`Processing product  files set ${i}...`);
      await processProductFile(i);
    }, i * PRODUCT_DATA_TIME);
  }
};

const getProducts = async (req, res) => {
  try {
    const noOfCollections = await Product.countDocuments();
    const documentsArray = await Product.find();

    let lastSlice = 10;
    let counter = 1;
    let sendingDataArray = [];

    res.setHeader("Content-Type", "application/json");

    for (let i = 0; i <= noOfCollections; i += 10) {
      const chunk = documentsArray.slice(i, lastSlice);
      sendingDataArray.push(chunk);
      lastSlice += 10;
    }

    // Simulate delay using setTimeout
    setTimeout(() => {
      res.status(200).json(sendingDataArray.flat());
    }, process.env.PRODUCT_DATA_TIME);
  } catch (e) {
    console.log("Something went wrong: GETPRODUCTS   ", e);
    return;
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (err) {
    console.log("Something went wrong fetching products by ID: ", err);
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const productsByBrand = await Product.find({ brandName: brand });
    if (productsByBrand.length !== 0)
      return res.status(200).json({ productsByBrand });
    return res.status(400).json({ message: "No brands by that name." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBrands = async (req, res) => {
  const brandNames = JSON.stringify([
    "Meditex",
    "Healixor",
    "Pharmora",
    "Tranquilix",
    "Vivora",
    "Neuravex",
    "Symbionix",
    "Theraflow",
    "Cardivex",
    "Immunora",
  ]);
  res.status(200).json(brandNames);
};

export { getProducts, getProductById, getProductsByBrand, getBrands };
