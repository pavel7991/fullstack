import express from 'express'
import { postLoginHandler, postRegisterHandler } from '../controllers/auth.mjs'
import { validateRegisterUser } from '../middlewares/validateRegisterUser.mjs'

const authRouter = express.Router()

authRouter.route('/register').post(validateRegisterUser, postRegisterHandler)
authRouter.route('/login').post(postLoginHandler)

export default authRouter
