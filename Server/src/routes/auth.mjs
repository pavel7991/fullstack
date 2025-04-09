import express from 'express'
import { postLoginHandler, postRegisterHandler } from '../controllers/auth.mjs'
import { validateRegisterUser } from '../middlewares/validateRegisterUser.mjs'
import { validateLoginUser } from '../middlewares/validateLoginUser.mjs'
import authentication from '../middlewares/authentication.mjs'
import User from '../models/users.mjs'
import { log } from '../utils/logger.mjs'

const authRouter = express.Router()

authRouter.route('/register').post(validateRegisterUser, postRegisterHandler)
authRouter.route('/login').post(validateLoginUser, postLoginHandler)
authRouter.route('/me').get(authentication, async (req, res, next) => {
	const id = req.user.id

	try {
		const user = await User.findById(id).select('-password')
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		res.status(200).json({ user: user })
	} catch (err) {
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

authRouter.route('/logout').post((req, res) => {
	res.clearCookie('token')
	res.status(200).json({ message: 'Вы вышли из системы' })
})

export default authRouter
