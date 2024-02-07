import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { registerProduct,allProduct } from "../controllers/product.controller.js";
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"productImage",
            maxCount: 1
        }
    ]),
    registerProduct
    )
router.route("/allProduct").get(allProduct)
export default router