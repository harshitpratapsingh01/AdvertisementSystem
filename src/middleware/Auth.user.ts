import { User } from "../models/schema.users";
import Session from "../models/schema.session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
// import { createClient } from "redis";

dotenv.config();

// const client = createClient();
// client.connect();

const key = process.env.SECRET_KEY;
export class Auth {
    static async find_user(email) {
        const isUser = await User.findOne({ where: { email} });
        if (isUser) {
            return isUser;
        }
        else {
            return false;
        }
    }


    static async update_session(user_id) {
        const isSession = await Session.findOne({ where: { userId: user_id } })
        if (isSession) {
            if (isSession.status) {
                await Session.update({ status: !isSession.status }, { where: { userId: user_id } });
                return true;
            }
            else {
                console.log("user already inactive")
                return false;
            }
        }
        else {
            return false;
        }
    }


    static async generate_hash_pass(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }


    static async verify_token(token) {
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, key);
            return decoded;
        }
        else {
            return false;
        }
    }


}