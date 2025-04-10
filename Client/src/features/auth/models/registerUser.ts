import axios from 'axios'
import api from '../../../shared/api/axios.ts'
import { RegisterUserInterface } from './types.ts'

const registerUser = async (data: RegisterUserInterface) => {
	try {
		const response = await api.post('/auth/register', data)
		return response.data.message
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { dataError } = error.response.data
			throw dataError || { global: ['Unexpected error'] }
		}
		throw { global: ['Ошибка сети или сервер не отвечает'] }
	}
}
export default registerUser
