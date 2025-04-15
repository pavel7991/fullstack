import { getTokenConfig } from '../config/token.config.mjs'
import { verifyToken } from '../utils/token.mjs'

const authentication = async (req, res, next) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ message: 'Требуется авторизация' })
	}
	try {
		const { key, verifyOptions } = getTokenConfig()
		req.user = await verifyToken(token, key, verifyOptions)
		next()
	} catch (err) {
		res.status(401).json({ message: 'Ошибка авторизации' })
	}
}

export default authentication
