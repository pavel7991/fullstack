import chalk from 'chalk'

export const log = (...args) => {
	const color = args.pop()

	if (typeof chalk[color] !== 'function') {
		console.error(`Color ${color} is not supported by chalk`)
		return
	}

	const message = args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2))).join(' ')
	console.log(chalk[color](message))
}
