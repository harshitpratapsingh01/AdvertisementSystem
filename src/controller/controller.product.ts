import { Product } from "../models/schmea.product";
import { Auth } from "../middleware/Auth.user";
import fs from "fs";
const { Op } = require("sequelize");

export class Products {
    static async addProductController(req: any, res: any) {
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            if (!isUser) {
                res.status(404).json({ message: "User not found" });
            }
            const Productdata = req.body;
            Productdata.heigher_bidding_price = Productdata.base_price;
            const product = await Product.create(Productdata);
            if (!product) {
                res.status(400).send("Something went wrong");
            }
            res.status(201).json({ message: "success", product });
        }
        catch (error) {
            res.status(500).send("Internal Server error");
        }
    }

    static async setproductimagesController(req: any, res: any) {
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            if (!isUser) {
                res.status(404).json({ message: "User not found" });
            }
            console.log(req.files);
            const pid = req.params.pid;
            const files = req.files;
            const bufferDataArray = [];
            for (let file in files) {
                const fileData = fs.readFileSync(files[file].path);
                const bufferData = Buffer.from(fileData);
                bufferDataArray.push(bufferData);
            }
            const product = await Product.update({ images: bufferDataArray }, { where: { [Op.and]: { seller_id: isUser.id, id: pid } } });
            console.log(product)
            if (product[0] == 0) {
                res.status(400).send("Something went wrong");
            }
            res.status(201).send("updated successfully");
        }
        catch (error) {
            res.status(500).send("Internal Server error");
        }
    }

    static async addbid(req: any, res: any) {
        const pid = req.params.pid;
        const currentBid = req.body.currentBid;
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            if (!isUser) {
                res.status(404).json({ message: "User not found" });
            }
            var product = await Product.findOne({ where: { id: pid } });
            console.log(product)
            if (product.heigher_bidding_price < currentBid && currentBid <= product.heigher_bidding_price + 500) {
                product = Product.update({ heigher_bidding_price: currentBid, Bidderid: isUser.id }, { where: { id: pid } })
            }
            else {
                res.status(402).json({ message: "current Bid price is high" });
            }
            res.status(201).json({ message: "bid updated" });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            console.log(error);
        }
    }

    static async deleteproductController(req: any, res: any) {
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            if (!isUser) {
                res.status(404).json({ message: "User not found" });
            }
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            }
            else {
                await product.destroy();
                res.status(200).json({ message: 'Product deleted successfully' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}