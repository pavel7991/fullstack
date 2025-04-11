import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts'
import { useEffect } from 'react'
import { checkAuthStatus } from '../models/auth.thunk.ts'

export const useAuthStatus = () => {
	const dispatch = useAppDispatch()
	const authStatus = useAppSelector((state) => state.auth.isAuthenticated)

	useEffect(() => {
		dispatch(checkAuthStatus())
	}, [dispatch])

	return authStatus
}
