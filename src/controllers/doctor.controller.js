import { Doctor } from "../models/doctor.models.js";
import { asyncHandler } from "../utility/asyncHandler.js";

const registerDoctor= asyncHandler( async (req,res)=>{
    let { name,email,password,fees,qualification,experienceInYears,specializedIn,clinicAdress,time}= req.body;
    try {
        const findDoctor= await Doctor.findOne({email});
        if(findDoctor)
        {
            res.status(422).json({
                message:"Doctor Already Registerd"
            })
        }
        else{
            const resultDoctor= await Doctor.create({
                name:name,
                email:email,
                password:password,
                fees:fees,
                qualification:qualification,
                experienceInYears:experienceInYears,
                specializedIn:specializedIn,
                clinicAdress:clinicAdress,
                time:time
            })
            if(resultDoctor)
            {
                res.status(200).json({
                    message:"Doctor register Succesfull"
                })
            }
            else{
                res.status(500).json({
                    message:"Server issue registering Doctor"
                })
            }
        }
    } catch (error) {
        console.log("Error in Register",error);
    }
})
const loginDoctor= asyncHandler (async (req,res)=>{
    let { email,password } = req.body;
   try {
    const doctorDetails= await Doctor.findOne({email});
    if(!doctorDetails){
        return res.status(404).json({
            message: "Admin is Not Registerd"
        })
    }
    else{
        const isPasswordCorrect = await doctorDetails.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Password Does Not Match"
            })
        }
        else{
            return res.status(200).json({
                message:"Doctor Login Sucessfull"
            })
        }
    }
   } catch (error) {
        console.log("Error to Login Admin",error)
   }
})

export {registerDoctor,loginDoctor}