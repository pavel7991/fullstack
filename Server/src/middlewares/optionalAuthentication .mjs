import { getTokenConfig } from '../config/token.config.mjs'
import { verifyToken } from '../utils/token.mjs'

export const optionalAuthentication = async (req, res, next) => {
	const token = req.cookies.token
	if (!token) return next()

	try {
		const { key, verifyOptions } = getTokenConfig()
		req.user = await verifyToken(token, key, verifyOptions)
	} catch (err) {
		req.user = null
	}
	next()
}
