import { log } from '../utils/logger.mjs'

const errorHandler = (err, req, res, next) => {
	const status = err.status || 500
	const message = err.message || 'Internal Server Error'
	const name = err.name || 'Unknown Error'
	const data = err.data || null

	log(`[${name}]:`, 'bgRed')
	log(`status: ${status} \nmessage: ${message} \ndata:`, data, 'inverse')

	res.status(status).json({ status, error: name, message, data })
}

export default errorHandler
