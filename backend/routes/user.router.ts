import express from "express"
import { getMe, loginUser, registerUser} from "../controllers/user.controller"
import Auth from "../middleware/auth.middleware"

const userRouter = express.Router()
//@Public
userRouter.post("/", registerUser)
//@Private
userRouter.get("/me",Auth, getMe)
//@Public
userRouter.post("/login", loginUser)

export default userRouter 
