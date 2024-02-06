import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

//CORS POLICY
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  
app.use(express.json({limit:"10mb"}))//limit is also optional
app.use(express.urlencoded({extended: true}))//extended is optional
app.use(express.static("public"))

//TYPE OF DATA ACEEPT
app.use(express.json({limit:"10mb"}))//limit is also optional
app.use(express.urlencoded({extended: true}))//extended is optional
app.use(express.static("public"))

//COOKIE MIDDLEWARE
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import  productRouter from "./routes/product.routes.js"
import  adminRouter from "./routes/admin.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/doctor",doctorRouter)
export default  app;