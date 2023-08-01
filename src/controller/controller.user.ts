import jwt from "jsonwebtoken";
import { User } from "../models/schema.users";
import { Address } from "../models/user.address.schema";
import bcrypt from "bcrypt";
import { Auth } from "../middleware/Auth.user";
import dotenv from "dotenv";
import { Sessions } from "./controller.session";
import { Redis } from "../middleware/redis.session";
import nodemailer from "nodemailer";
import { Validate } from "../middleware/validate.user";

dotenv.config();

export class UserModel {

    // #####################################SignUp User########################################### 

    static async signup(req: any, res: any) {
        const details = req.body;
        try {
            // await Validate.validateUser.validateAsync(details);
            const isUser = await Auth.find_user(details.email);
            if (!isUser) {
                const hash_pass = await Auth.generate_hash_pass(details.password);

                const UserDetails = {
                    username: details.username,
                    first_name: details.first_name,
                    last_name: details.last_name,
                    email: details.email,
                    password: hash_pass,
                    mobile_no: details.mobile_no,
                    gender: details.gender,
                    dob: details.dob
                }
                const user_details = await User.create(UserDetails);
                res.status(200).json({ message: "SignUp Successfully" });
                console.log(user_details);
            }
            else {
                res.status(404).json({ message: "User already exist" });
            }
        }
        catch (err) {
            res.status(400).json({ message: "Error" })
        }
    }

    static async user_address(req: any, res: any){
        const details = req.body;
        try{
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            if(!isUser){
                res.status(404).json({message: "User not found"});
            }

            const addressDetails = {
                    house_no: details.house_no,
                    street_no: details.street_no,
                    area: details.area,
                    landmark: details.landmark,
                    city: details.city,
                    state: details.state,
                    country: details.country,
                    zipCode: details.zipCode,
                    userId: isUser.id,
                    addressType: details.addressType
                }
                const address_details = await Address.create(addressDetails);
                res.status(201).json({messgae: "address add successfully", address_details})
                console.log(address_details);
        }
        catch(error){
            console.log(error);
            res.status(400).json({ message: "Error" })
        }
    }

    // #####################################Login User#######################################


    static async login(req: any, res: any) {
        const details = req.body;
        try {
            // await Verify.verify_login_details.validateAsync(details);
            const isUser = await Auth.find_user(details.email);
            console.log(isUser);
            if (isUser) {
                const hash = isUser.password;
                if (bcrypt.compare(details.password, hash)) {
                    const token = jwt.sign({ email: details.email }, process.env.SECRET_KEY, { expiresIn: '2d' });
                    res.status(200).json({ message: "login successfully", isUser, token });

                    await Sessions.maintain_session(isUser);
                }
                else {
                    res.status(404).json({ message: "password is incorrect" });
                }
            }
            else {
                res.status(404).json({ status: "user not found" });
            }
        }
        catch (err) {
            res.status(500).json({ status: "Server Error" });
        }
    }


    // ###################################### LogOut User#################################### 


    static async logout_user(req: any, res: any) {
        try {
            const user = await Auth.verify_token(req.headers.authorization);
            const isUser = await Auth.find_user(user.email);
            console.log(isUser)
            if (isUser) {
                const user = isUser.id;
                if (Auth.update_session(user)) {
                    await Redis.logout_session_redis(isUser);
                    res.status(200).json({ message: "User Logout Successfully" })
                }
                else {
                    res.status(404).json({ message: "Session not found" });
                }
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: "Server Error" });
        }
    }


    // #####################################Forgot password####################################

    // SENDING OTP VIA MAIL API

    static async forgot_password(req: any, res: any) {
        try {
            const { email } = req.body;
            const user = await Auth.find_user(email);
            if (!user) {
                return res.status(400).json({ message: 'Email not found' });
            }

            let OTP = Math.floor(1000 + Math.random() * 9000);
            Redis.save_otp(email, OTP);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: 'Password Reset Request',
                text: ` You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n YOUR RESET PASSWORD OTP IS: ${OTP}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'Error sending email' });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: 'Password reset OTP sent to email' });
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // RESET PASSWORD API

    static async reset_password(req: any, res: any) {
        try {
            const { email, otp, newPassword } = req.body;

            const user = await Auth.find_user(email);;

            if (!user) {
                return res.status(400).json({ message: 'Invalid User' });
            }

            const userOTP = await Redis.get_otp(email);
            console.log(userOTP);
            if (!userOTP || userOTP !== otp) {
                return res.status(401).json({ error: 'Invalid OTP' });
            }

            console.log(user.password);
            user.password = await Auth.generate_hash_pass(newPassword);
            console.log(user.password);
            await user.save();

            return res.status(200).json({ message: 'Password reset successful' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}




// nodes in clusters mongodb

// change stream
