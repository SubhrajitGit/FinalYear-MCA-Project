import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})
//DATABASE CONNECTION
connectDB();

const port = process.env.PORT||4000
const app = express()

app.get('/', function (req, res) {
  res.send('Home Page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })