const corsOptions = {
	origin: 'https://fullstack-rust-one.vercel.app/', // Разрешаем запросы только с этого домена
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем только определенные методы
	credentials: true, // Разрешаем передачу кук и заголовков авторизации
	optionsSuccessStatus: 200 // Для старых браузеров}
}

export default corsOptions
