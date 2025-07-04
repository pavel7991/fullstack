const options = {
	algorithm: 'HS512',
	expiresIn: `30d`,
	audience: process.env.JWT_AUDIENCE || 'http://localhost:3000',
	issuer: 'MyApp'
}
const verifyOptions = {
	audience: process.env.JWT_AUDIENCE || 'http://localhost:3000',
	issuer: 'MyApp'
}

export const getTokenConfig = () => {
	if (!process.env.SECRET_KEY) {
		throw new Error('SECRET_KEY is not defined in environment variables')
	}

	return {
		key: process.env.SECRET_KEY,
		options,
		verifyOptions
	}
}
