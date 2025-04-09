import api from '../../../shared/api/axios.ts'

const checkAuth = async () => {
	try {
		await api.get('/auth/me')
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message)
		} else {
			throw new Error('An unknown error occurred')
		}
	}
}

export default checkAuth
