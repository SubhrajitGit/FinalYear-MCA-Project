import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    productImage:{
        type:String
    },
    price:{
        type:Number,
        default: 0
    },
    stock:{
        type:Number,
        default: 0
    },
    // category:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"",
    //     required: true,
    // },
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"",
    // }
})
export const Product=mongoose.model("Product",productSchema);