import { asyncHandler } from "../utility/asyncHandler.js";
import { uploadOnCloudinary } from "../utility/cloudnary.js";
import { ApiError } from "../utility/ApiError.js";
import { Product } from "../models/product.models.js";

const registerProduct = asyncHandler(async (req, res) => {
  let { description, name, price } = req.body;
  try {
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(422).json({
        message: "Product Already Registered",
      });
    }

    const productLocalpath = req.files?.productImage[0]?.path;

    if (!productLocalpath) {
      throw new ApiError(400, "Image is Required");
    }
    const productImage = await uploadOnCloudinary(productLocalpath);

    if (!productImage) {
      throw new ApiError(400, "Image Required failed to load on Cloudnary");
    }

    const product=await Product.create({
        description:description,
        name:name,
        productImage:productImage.url,
        price:price
    })
    if(product)
    {
        res.status(201).json({
            message:"Product Register Sucessfull"
        })
    }
    else{
        res.status(500).json({
            message:"Product Register Fail Server Error"
        })
    }
  } catch (error) {
    console.log("Error while registering Product", error);
  }
});

const allProduct=asyncHandler(async (req,res)=>{
  try {
    const product=await Product.find({});
    console.log(product)
  } catch (error) {
    console.log("Error While Fetching Product")
  }
})
export { registerProduct,allProduct };
