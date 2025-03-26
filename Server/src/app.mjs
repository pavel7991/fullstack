import express from 'express'
import cors from 'cors'
import router from './routes/index.mjs'
import { logRequests } from './middleware/logRequest.mjs'

const app = express()
const PORT = 5000

app.use(
	cors({
		origin: 'http://localhost:5173', // Разрешаем запросы только с этого домена
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем только определенные методы
		credentials: true // Разрешаем передачу кук и заголовков авторизации
	})
)

app.use(express.json())
app.use(logRequests)
app.use(router)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
