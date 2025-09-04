import express from "express";
import { login, logout, refreshTokencontroller, register, tokenVerify } from "../../controllers/authController.js";
import { verifyAccessToken } from "../../middleware/authMiddleware.js";


let RegisterRoutes = express.Router();

RegisterRoutes.post("/register",register)   // http://localhost:5000/web/auth/login 

RegisterRoutes.post("/login",login)

RegisterRoutes.post("/refresh-token",refreshTokencontroller)

RegisterRoutes.post("/logout",logout)

RegisterRoutes.get("/profile" , verifyAccessToken ,tokenVerify)

export {RegisterRoutes} 