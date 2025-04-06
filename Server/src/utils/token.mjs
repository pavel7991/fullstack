import jwt from 'jsonwebtoken'

export async function signToken(payload, secretKey, options) {
	if (!payload || !secretKey) {
		throw new Error('Payload and secretKey are required')
	}
	if (typeof secretKey !== 'string') {
		throw new Error('secretKey must be a string')
	}

	return new Promise((resolve, reject) => {
		jwt.sign(payload, secretKey, options, (err, token) => {
			if (err) {
				reject(err)
				return
			}
			resolve(token)
		})
	})
}

export async function verifyToken(token, secretKey, verifyOptions) {
	if (!token || !secretKey) {
		throw new Error('Token and secretKey are required')
	}
	if (typeof token !== 'string') {
		throw new Error('Token must be a string')
	}
	if (typeof secretKey !== 'string') {
		throw new Error('secretKey must be a string')
	}

	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, verifyOptions, (err, decoded) => {
			if (err) {
				reject(err)
			}
			resolve(decoded)
		})
	})
}
