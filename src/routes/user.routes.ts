import express from "express";
import { UserModel } from "../controller/controller.user";

export const userRouter = express.Router();

userRouter.post('/signUp', UserModel.signup);
userRouter.post('/login', UserModel.login);
userRouter.get('/logout', UserModel.logout_user);
userRouter.post('/forgot_password', UserModel.forgot_password);
userRouter.post("/reset_password", UserModel.reset_password);

