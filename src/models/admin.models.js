import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";

const adminSchema=new mongoose.Schema({
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
    //Connection Reference
    userRef: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    doctorRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    }
},{timestamps: true})

adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})

adminSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
adminSchema.plugin(mongooseAggregatePaginate)

export const Admin=mongoose.model("Admin",adminSchema);