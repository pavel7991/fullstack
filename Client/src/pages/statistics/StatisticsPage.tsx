import { Container, Stack, Typography } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { useEffect, useState } from 'react'
import api from '../../shared/api/axios.ts'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { AxiosError } from 'axios'

interface Stats {
	uniqueAuthorsCount: number
	totalArticles: number
	avgContentLength: number
	maxContentLength: number
	minContentLength: number
	oldestArticleDate: string
	latestArticleDate: string
}

const StatisticsPage = () => {
	const [stats, setStats] = useState<Stats | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await api.get('/articles/stats')
				setStats(response.data)
			} catch (error) {
				if (error instanceof AxiosError) {
					return setError(
						error.response?.data?.message || 'Error fetching stats'
					)
				}
				setError('An unexpected error occurred')
			}
		}

		fetchStats().catch()
	}, [])

	return (
		<Container>
			<TitlePage text={'Blog Statistics'} />

			{error && <ErrorFetch error={error} />}
			{!stats && !error && <Loader />}
			{stats && (
				<Stack spacing={1} sx={{ mb: 2 }}>
					<Typography> Total Authors: {stats.uniqueAuthorsCount}</Typography>
					<Typography>Total articles: {stats.totalArticles}</Typography>
					<Typography>Max content length: {stats.maxContentLength}</Typography>
					<Typography>Min content length: {stats.minContentLength}</Typography>
					<Typography>
						Average content length: {stats.avgContentLength}
					</Typography>
					<Typography>
						Oldest Articles Date:{' '}
						{new Date(stats.oldestArticleDate).toLocaleDateString()}
					</Typography>
					<Typography>
						Latest Articles Date{' '}
						{new Date(stats.latestArticleDate).toLocaleDateString()}
					</Typography>
				</Stack>
			)}
		</Container>
	)
}
export default StatisticsPage
