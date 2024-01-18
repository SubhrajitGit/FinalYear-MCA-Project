import { asyncHandler } from "../utility/asyncHandler.js"
import {ApiError} from "../utility/ApiError.js";
import {User} from "../models/user.models.js"


// const generateAccessTokenAndResfreshToken= async function(userId){
//     try {
//         const user = await User.findById(userId);
//         const acessToken=user.generateAccessToken();
//         const refreshToken=user.generateRefreshToken();
        
//         user.refreshToken=refreshToken;
//         await user.save({ValidateBeforeSave: false});

//         return {acessToken,refreshToken};
//     } catch (error) {
//         console.log("Something Went Wrong",error)
//     }
// }

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
                    message:"User Register Fail Server Error"
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
        let findUser= await User.findOne({ email })
        if(!findUser){
            return res.status(404).json({
                message:"User Does Not Exist"
            })
        }
        const isPasswordCorrect=await findUser.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Password Does Not Match"
            })
        }
        else{
            return res.status(200).json({
                message:"Login Sucessfull"
            })
        }

        // const { acessToken,refreshToken } = await generateAccessTokenAndResfreshToken(user._id);

        // await User.findById(user._id);

    } catch (error) {
        console.log("Login Failed")
    }
})
export {registerUser,loginUser}