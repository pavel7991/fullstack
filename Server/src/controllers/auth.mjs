import { signToken } from '../utils/token.mjs'
import User from '../models/users.mjs'
import { log } from '../utils/logger.mjs'

export const postRegisterHandler = async (req, res, next) => {
	const { username, email, password } = req.body

	log(`email: ${email}`, 'yellow')
	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			const message = 'Пользователь с таким email уже существует'

			return next({
				name: 'ERROR_CONFLICT',
				status: 409,
				message,
				data: {
					email: message
				}
			})
		}

		const newUser = new User({ username, email, password })
		await newUser.save()

		res.status(201).json({ message: `Пользователь ${username} успешно зарегистрирован!` })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
}

export const postLoginHandler = async (req, res) => {
	const { username, password } = req.body

	const secretKey = process.env.SECRET_KEY
	const options = { algorithm: 'HS512', expiresIn: '3s', audience: 'http://localhost:3000', issuer: 'MyApp' }

	if (username === 'admin' && password === 'password') {
		try {
			const token = await signToken({ username }, secretKey, options)

			res.setHeader('X-Token', token)
			res.json({ message: 'User logged in successfully' })
		} catch (err) {
			res.status(401).json({ message: 'Unauthorized' })
		}
	}
}
