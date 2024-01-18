import { asyncHandler } from "../utility/asyncHandler.js"
import {ApiError} from "../utility/ApiError.js";
import {User} from "../models/user.models.js"
const registerUser = asyncHandler( async (req,res)=>{

    let { username,email,password,number }=req.body;//details from website
    try {
        const userExist= await User.findOne({email})
        if(userExist){
            return res.status(422).json({
                message:"User Already Exist"//Also we can write 'throw newApiError(422,"User Already Exist")'
            })
        }
        else{
            const user=new User({
                username:username,
                email:email,
                password:password,
                number:number
            });

            const userRegister= await user.save();
            if(userRegister)
            {
                res.status(201).json({
                    message:"User Register Sucessfull"
                })
            }
            else{
                res.status(500).json({
                    message:"User Register Fsil Server Error"
                })
            }
        }
        
    } catch (error) {
        console.log("Error to register",error)
    }
})

const loginUser = asyncHandler( async (req,res)=>{
    let { email,password }=req.body;
    try {
        let findUser= await User.find({
            $and:[{ email },{ password }]//and:Mongodb operator
        })
        if(findUser){

        }
    } catch (error) {
        console.log("Login Failed")
    }
})
export {registerUser,loginUser}