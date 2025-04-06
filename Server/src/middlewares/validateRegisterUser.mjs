import { registerUserSchema } from '../schemas/userSchema.mjs'
import { log } from '../utils/logger.mjs'

export const validateRegisterUser = (req, res, next) => {
	const { error } = registerUserSchema.validate(req.body, { abortEarly: false })

	if (error) {
		const details = {}
		error.details.forEach((err) => {
			details[err.path[0]] = err.message
		})

		return next({
			name: 'ERROR_USER_VALIDATION',
			status: 400,
			message: 'Ошибка валидации данных',
			data: details
		})
	}

	next()
}
