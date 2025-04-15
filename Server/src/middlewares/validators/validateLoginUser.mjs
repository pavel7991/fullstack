import { loginUserSchema } from '../../schemas/userSchema.mjs'

export const validateLoginUser = (req, res, next) => {
	const { error } = loginUserSchema.validate(req.body, { abortEarly: false })

	if (error) {
		const details = {}
		error.details.forEach((err) => {
			details[err.path[0]] = err.message
		})

		return next({
			name: 'ERROR_USER_VALIDATION',
			status: 400,
			message: 'Ошибка валидации данных',
			dataError: details
		})
	}

	next()
}
