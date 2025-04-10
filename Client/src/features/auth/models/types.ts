export interface LoginUserInterface {
	email: string
	password: string
	global?: string
}

export interface RegisterUserInterface extends LoginUserInterface {
	username: string
	confirmPassword: string
}

export interface ErrorRegisterInterface {
	username?: string
	email?: string
	password?: string
	confirmPassword?: string
	global?: string[]
}
