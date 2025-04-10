import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store.ts'
import { useEffect } from 'react'
import { checkAuthStatus } from '../../features/auth/models/auth.thunk.ts'

const AppInit = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(checkAuthStatus())
	}, [dispatch])
	return null
}

export default AppInit
