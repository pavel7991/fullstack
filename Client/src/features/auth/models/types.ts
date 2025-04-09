export interface LoginUserInterface {
	email: string
	password: string
	global?: string
}

export interface RegisterUserInterface extends LoginUserInterface {
	username: string
	confirmPassword: string
}
