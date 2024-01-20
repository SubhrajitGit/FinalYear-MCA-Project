import mongoose from "mongoose";
import bcrypt from "bcrypt";
const avilableTime=new mongoose.Schema({
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    }
})
const doctorSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
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

doctorSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})

doctorSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const Doctor=mongoose.model("Doctor",doctorSchema);