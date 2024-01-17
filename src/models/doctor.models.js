import mongoose from "mongoose";

const avilableTime=new mongoose.Schema({
    start:{
        type: Number,
        required: true
    },
    end:{
        type: Number,
        required: true
    }
})
const doctorSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    fees:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    experienceInYears:{
        type: Number,
        required: true,
        default: 0
    },
    specializedIn:[
        {
            type:String
        }
    ],
    clinicAdress:{
        type: String,
        required: true
    },
    time:{
        type:[avilableTime]
    }
})
export const Doctor=mongoose.model("Doctor",doctorSchema);