import { asyncHandler } from "../utility/asyncHandler.js"

const registerUser = asyncHandler( async (req,res)=>{
    res.status(200).json({
        message: "Register Sucessfull"
    })
})

const loginUser = asyncHandler( async (req,res)=>{
    res.status(200).json({
        message: "Login Succesfull"
    })
})
export {registerUser,loginUser}