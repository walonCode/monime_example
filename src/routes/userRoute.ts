import { Router } from "express";
import { login, register } from "../controllers/userController";

const userRouter = Router()

userRouter.route("/login").post(login)
userRouter.route('/register').post(register)

export default userRouter