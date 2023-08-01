import express from "express";
import { upload } from "../middleware/picuploader";
import { UserOperations } from "../controller/controller.UserOperation";
import { Categories } from "../controller/controller.category";
import { Products } from "../controller/controller.product";

export const operationsRouter = express.Router();


operationsRouter.get('/getProfile', UserOperations.getProfile);
operationsRouter.post("/setProfile",upload.single('photo'), UserOperations.set_profile_pic);
operationsRouter.get('/getCategories', Categories.getCategoryController);
operationsRouter.post('/getSubCategories', Categories.getsubCategoryController);
operationsRouter.post("/addProduct", Products.addProductController);
operationsRouter.post("/addProductImage/:pid", upload.array('images',5), Products.setproductimagesController);
operationsRouter.delete("/deleteProduct/:id", Products.deleteproductController);
operationsRouter.post("/addBid/:pid", Products.addbid);
