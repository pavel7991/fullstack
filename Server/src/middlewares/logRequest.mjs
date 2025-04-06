import { log } from '../utils/logger.mjs'

export const logRequests = (req, res, next) => {
	log(
		`${new Date().toLocaleTimeString()} | Method:[${req.method}] | Url:[${req.originalUrl}] | Status Code:[${res.statusCode}]`,
		'yellow'
	)
	next()
}
