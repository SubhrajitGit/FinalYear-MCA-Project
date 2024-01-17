import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        min:[8,"Password Must Be 8 Character"],
        max:12
    },
    number: {
        type: Number,
        required: [true, 'Phone Number Required']
      },
},{timestamps: true}
)
export const User=mongoose.model("User",userSchema);