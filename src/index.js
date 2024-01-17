import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import app from "./app.js";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is Running at Port: ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed!!!", err);
        process.exit(1); // Exit the process with an error code
    });
