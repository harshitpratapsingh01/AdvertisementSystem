import { Auth } from "../middleware/Auth.user";
import { Category } from "../models/category.schema";


export class Categories{

    static async getCategoryController(req: any, res: any){
        try {
            // const user = await Auth.verify_token(req.headers.authorization);
            const categoryData = await Category.findAll({attributes:['Category'],group:'Category'});
            if (!categoryData) {
                res.status(400).send("Something went wrong");
            }
            res.status(201).json({message: "Success", categoryData});
        }
        catch (error) {
            res.status(500).send("Internal Server error");
        }
    }
    
    static async getsubCategoryController(req: any, res: any){
        try {
            // const user = await Auth.verify_token(req.headers.authorization);
            const subcategoryData = await Category.findAll({where:{Category:req.body.category},distinct:'Category',attributes: { exclude: ['createdAt', 'updatedAt'] } });
            if (!subcategoryData) {
                res.status(400).send("Something went wrong");
            }
            res.status(201).json({message: "Success", subcategoryData});
        }
        catch (error) {
            res.status(500).send("Internal Server error");
        }
    }
}
