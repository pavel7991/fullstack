import { useAuthStatus } from '../../features/auth/hooks/useAuthStatus.ts'

const AppInit = () => {
	useAuthStatus()
	return null
}

export default AppInit
