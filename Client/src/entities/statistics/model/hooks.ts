import { useEffect, useState } from 'react'
import { Stats } from './types.ts'
import { getStats } from './api.ts'
import { AxiosError } from 'axios'

export const useStats = () => {
	const [stats, setStats] = useState<Stats | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await getStats()
				setStats(data)
				setError(null)
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error.response?.data?.message || 'Error fetching stats')
				} else {
					setError('An unexpected error occurred')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchStats().catch()
	}, [])

	return { stats, loading, error }
}
