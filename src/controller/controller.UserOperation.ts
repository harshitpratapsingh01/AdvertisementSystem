import { User } from "../models/schema.users";
import { Auth } from "../middleware/Auth.user";
import { createClient } from "redis";
const fs = require('fs');
import { Redis } from "../middleware/redis.session";

const client = createClient();
client.connect();

export class UserOperations {

    // ########################################## Get Profile api#########################################

    static async getProfile(req: any, res: any) {
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await User.findOne({ where: { email: user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'status'] } });
            if (isUser) {
                const status = await Redis.isActiv(isUser);
                if (status) {
                    res.status(200).json({ message: "Success", isUser });
                }
                else {
                    res.status(404).json({ message: "please login first" });
                }
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: "Error" });
        }
    }

    // ###################################################Update profile api#############################################

    static async set_profile_pic(req: any, res: any) {

        try {
            const user = await Auth.verify_token(req.headers.authorization);
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            const file = req.file;
            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData);
            console.log(bufferData);
            const result = User.update({ profilePic: bufferData }, { where: { email: user.email } });

            if (!result) {
                res.status(400).send("Something went wrong");
            }
            res.status(201).send("updated successfully");
        }
        catch (error) {
            res.status(500).send("Internal Server error");
        }
    }
}