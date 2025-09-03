import express from "express"
import { RegisterRoutes } from "./registerRoutes.js"

let webRoutes = express.Router()

webRoutes.use('/auth',RegisterRoutes) // http://localhost:5000/web/auth/

export {webRoutes}