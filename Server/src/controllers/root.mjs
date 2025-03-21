const getRootHandler = (req, res) => {
	res.status(200).json({
		message: 'Hello, From Express!'
	})
}

export { getRootHandler }
