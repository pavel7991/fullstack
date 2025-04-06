import { object, ref, string } from 'yup'

const usernameSchema = string()
  .min(3, 'Минимальная длина имени 3 символа')
  .required('Обязательное поле')

const passwordSchema = string()
  .min(3, 'Минимальная длина пароля 3 символа')
  .max(12, 'Максимальная длина пароля 12 символов')
  .required('Обязательное поле')

const emailSchema = string().email('Некорректный email').required('Обязательное поле')

const confirmPasswordSchema = string()
  .oneOf([ref('password')], 'Пароли не совпадают')
  .required('Обязательное поле')

export const registerValidationSchema = object().shape({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  email: emailSchema
})

export const loginValidationSchema = object().shape({
  username: usernameSchema,
  password: passwordSchema
})
