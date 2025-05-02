import { useEffect, useState } from 'react'
import { User } from './types.ts'
import { getAllUser, getUserDetails } from './api.ts'
import { Article } from '../../article/model/types.ts'
import { AxiosError } from 'axios'

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await getAllUser()
				setUsers(data)
				setError(null)
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error.response?.data?.message || 'Error fetching users')
				} else setError('An unexpected error occurred')
			} finally {
				setLoading(false)
			}
		}
		fetchUsers().catch()
	}, [])

	return { users, loading, error }
}

export const useUserDetails = (id: string) => {
	const [user, setUser] = useState<User | null>(null)
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const { data } = await getUserDetails(id)
				setUser(data.user)
				setArticles(data.articles)
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(
						error.response?.data?.message || 'Error fetching user details'
					)
				} else setError('An unexpected error occurred')
			} finally {
				setLoading(false)
			}
		}
		fetchUserDetails().catch()
	}, [id])

	return { user, articles, loading, error }
}
