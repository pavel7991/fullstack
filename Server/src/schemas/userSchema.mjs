import Joi from 'joi'

const usernameSchema = Joi.string().alphanum().min(3).max(30).required().messages({
	'string.alphanum': 'Username должен содержать только буквы и цифры',
	'string.min': 'Username должен быть не менее {#limit} символов',
	'string.max': 'Username должен быть не более {#limit} символов',
	'string.empty': 'Имя пользователя не может быть пустым',
	'any.required': 'Username обязателен для заполнения'
})

const emailSchema = Joi.string()
	.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
	.required()
	.messages({
		'string.email': 'Пожалуйста, введите корректный email',
		'string.empty': 'Email не может быть пустым',
		'any.required': 'Email обязателен для заполнения'
	})

const passwordSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
	'string.pattern.base': 'Пароль должен содержать только буквы и цифры, длиной от 3 до 30 символов',
	'any.required': 'Пароль обязателен для заполнения'
})

const confirmPasswordSchema = Joi.string().valid(Joi.ref('password')).required().messages({
	'any.only': 'Пароли не совпадают',
	'any.required': 'Подтверждение пароля обязательно'
})

export const registerUserSchema = Joi.object({
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
	confirmPassword: confirmPasswordSchema
})

// Схема для авторизации
export const loginSchema = Joi.object({
	email: emailSchema,
	password: passwordSchema
})
