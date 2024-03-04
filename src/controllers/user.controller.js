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

//forgot password part
var e = "";
const forgotUser = asyncHandler(async (req, res) => {
  try {
    e = req.body.email;
    const finduser = await User.findOne({ email: e });
    if (finduser) {
      //logic for mail start..................

      var trasport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pabitramoharana5678@gmail.com",
          pass: "kgrj oorx pjiw hjjl",
        },
      });
      var otp = Math.floor(Math.random() * 1000000);
      console.log(otp);
      var mail = {
        form: "pabitramoharana5678@gmail.com",
        to: e,
        subject: "your otp",
        text: " your otp is" + " " + otp,
      };
      trasport.sendMail(mail, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`mail send to`, info.response);
          return res.status(200).json({
            message: "otp send succsess",
          });
        }
      });

      //logic for mail end....................
    }
} catch (err) {
    console.log(err);
}
});

export {registerUser,loginUser,forgotUser}