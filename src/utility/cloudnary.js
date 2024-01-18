import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
try {
    if(!localFilePath)
    {
        return null;
    }
    //UPLOAD FILE IN CLOUDNARY
    const response=cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
    })
    //FILE UPLOAD SUCESSFULL
    console.log("FIle Upload Sucessfull In Cloudnary",response.url);
    return response;
} catch (error) {
    fs.unlinkSync(localFilePath) //remove the locally saved temp file when operation got fail
    return null;
}
}

export {uploadOnCloudinary}