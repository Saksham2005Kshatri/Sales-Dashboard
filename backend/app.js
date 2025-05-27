import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import mongooseConnect from "./mongoConnect.js";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";

dotenv.config();

mongooseConnect();

const app = express();

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

// will make the request object contain the body for json data
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
