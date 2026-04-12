import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJwt,logoutUser)






export default router