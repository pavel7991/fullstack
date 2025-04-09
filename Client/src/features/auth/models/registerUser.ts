import axios from 'axios'
import api from '../../../shared/api/axios.ts'
import { RegisterUserInterface } from './types.ts'

const registerUser = async (data: RegisterUserInterface) => {
	try {
		const response = await api.post('/auth/register', data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response
			console.error(`${data.error} ${status} (${data.message})`)

			if (status === 400) {
				throw data.data || { global: ['Что-то пошло не так'] }
			}
			if (status === 409) {
				throw data.data || { global: ['Пользователь с таким email уже существует'] }
			}
		}
		throw { global: ['Ошибка сети или сервер не отвечает'] }
	}
}
export default registerUser
