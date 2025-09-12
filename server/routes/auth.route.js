import express from 'express'
import {signup,signin} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const authRouter = express.Router()

//JWT token verification
authRouter.get('/verify',authMiddleware)

//SIGNUP ROUTES
authRouter.post('/signup',signup)

//SIGNUP ROUTES
authRouter.post('/signin',signin)
