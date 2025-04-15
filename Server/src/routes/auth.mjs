import express from 'express'
import { getMeHandler, postLoginHandler, postRegisterHandler } from '../controllers/auth.mjs'
import { validateRegisterUser } from '../middlewares/validators/validateRegisterUser.mjs'
import { validateLoginUser } from '../middlewares/validators/validateLoginUser.mjs'
import authentication from '../middlewares/authentication.mjs'

const authRouter = express.Router()

authRouter.route('/register').post(validateRegisterUser, postRegisterHandler)
authRouter.route('/login').post(validateLoginUser, postLoginHandler)
authRouter.route('/me').get(authentication, getMeHandler)

authRouter.route('/logout').post((req, res) => {
	res.clearCookie('token')
	res.status(200).json({ message: 'Вы вышли из системы' })
})

export default authRouter
