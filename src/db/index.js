import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async() =>{
    try {
        const connection=await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
        console.log(`MongoDB Connected ${connection.connection.host}`);
    } catch (error) {
        console.log("Connection Error",error);
        process.exit(1);
    }
}
export default connectDB