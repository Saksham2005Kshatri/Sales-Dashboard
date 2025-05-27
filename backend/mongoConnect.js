import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../backend/.env" });

const mongooseConnect = async () => {
  try {
    const url = process.env.MONGODB_URL;

    if (!url) throw new Error("MONGODB_URL is not defined");

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB conneceted!! `);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export default mongooseConnect;
