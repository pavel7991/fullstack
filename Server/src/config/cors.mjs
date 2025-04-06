const corsOptions = {
	origin: ['http://localhost:5173', 'http://localhost:5174'], // Разрешаем запросы только с этого домена
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем только определенные методы
	credentials: true, // Разрешаем передачу кук и заголовков авторизации
	optionsSuccessStatus: 200 // Для старых браузеров}
}

export default corsOptions
