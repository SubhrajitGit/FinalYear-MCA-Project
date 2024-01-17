import mongoose from "mongoose";

const orderItemschema=new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        required: true
    }
})

const orderSchema=new mongoose.Schema({
    orderPrice:{
        type: Number,
        required: true
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemschema]
    },
    adress:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["PENDING","CANCELED","DELIVERED"],
        default: "PENDING"
    }
},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema)