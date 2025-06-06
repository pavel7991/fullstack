import { signToken } from '../utils/token.mjs'
import User from '../models/users.mjs'
import { log } from '../utils/logger.mjs'
import bcrypt from 'bcrypt'
import { getTokenConfig } from '../config/token.config.mjs'

export const getMeHandler = async (req, res, next) => {
	const id = req.user.id

	try {
		const user = await User.findById(id).select('-password')
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		res.status(200).json({
			user: {
				id: user._id,
				username: user.username
			}
		})
	} catch (err) {
		res.status(500).json({ message: 'Ошибка сервера' })
	}
}

export const postRegisterHandler = async (req, res, next) => {
	const { username, email, password } = req.body

	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			const message = 'Пользователь с таким email уже существует'

			return next({
				name: 'ERROR_CONFLICT',
				status: 409,
				message,
				dataError: {
					email: message
				}
			})
		}

		const newUser = new User({ username, email, password })
		await newUser.save()

		res.status(201).json({
			message: `Пользователь ${username} успешно зарегистрирован!`,
			user: {
				id: newUser._id,
				username: newUser.username
			}
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
}

export const postLoginHandler = async (req, res, next) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user) {
			const message = 'Пользователь с таким email не найден'
			return next({
				name: 'ERROR_USER_NOT_FOUND',
				status: 400,
				message,
				dataError: {
					email: message
				}
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			const message = 'Неверный пароль'
			return next({
				name: 'ERROR_INVALID_PASSWORD',
				status: 401,
				message,
				dataError: {
					password: message
				}
			})
		}

		const { key, options } = getTokenConfig()
		const token = await signToken({ id: user._id }, key, options)

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			maxAge: 60 * 60 * 1000
		})

		log('Set cookie token', 'green')

		res.status(200).json({
			token,
			message: 'Вход выполнен успешно',
			user: {
				id: user._id,
				username: user.username
			}
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
}
