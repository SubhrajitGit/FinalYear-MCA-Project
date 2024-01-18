import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

//CORS POLICY
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//TYPE OF DATA ACEEPT
app.use(express.json({limit:"20kb"}))//limit is also optional
app.use(express.urlencoded({extended: true}))//extended is optional
app.use(express.static("public"))

//COOKIE MIDDLEWARE
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/users",userRouter)

export default  app;