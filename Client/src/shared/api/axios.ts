import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true // отправка cookie
})

export default api
