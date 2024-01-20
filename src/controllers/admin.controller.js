import { asyncHandler } from "../utility/asyncHandler.js";
import { Admin } from "../models/admin.models.js";
import { ApiError } from "../utility/ApiError.js";

const registerAdmin = asyncHandler( async (req,res)=>{
    let { username,email,password,number }=req.body;
    try {
        const adminExist= await Admin.findOne({email})
        if(adminExist){
            return res.status(422).json({
                message:"Admin Already Registered"
            })
        }
        else{
            const resultAdmin=await Admin.create({
                username:username,
                email:email,
                password:password,
                number:number

            })
            if(!registerAdmin)
            {
                res.status(500).json({
                    message:"Server issue registering Admin"
                })
            }
            else{
                res.status(200).json({
                    message:"Admin register Succesfull"
                })
            }
        }
    } catch (error) {
        console.log("Error Registering Admin",error)
    }
})
const loginAdmin = asyncHandler( async (req,res)=>{
   try {
    let { email,password } = req.body;
    const adminDetails= await Admin.findOne({email});
    if(!adminDetails){
        return res.status(404).json({
            message: "Admin is Not Registerd"
        })
    }
    else{
        const isPasswordCorrect = await adminDetails.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Password Does Not Match"
            })
        }
        else{
            return res.status(200).json({
                message:"Admin Login Sucessfull"
            })
        }
    }
   } catch (error) {
        console.log("Error to Login Admin",error)
   }
})

export {registerAdmin,loginAdmin}