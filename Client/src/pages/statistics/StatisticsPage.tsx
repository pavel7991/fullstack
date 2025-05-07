import { Box, Container, Typography, Grid } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { useEffect, useState } from 'react'
import api from '../../shared/api/axios.ts'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { AxiosError } from 'axios'
import { Paper } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ArticleIcon from '@mui/icons-material/Article'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import UpdateIcon from '@mui/icons-material/Update'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

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
				<Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
					<Typography
						variant="h6"
						component="h3"
						sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
					>
						<BarChartIcon color="primary" sx={{ mr: 1 }} />
						Statistics
					</Typography>

					<Grid container spacing={2}>
						<Grid>
							<Paper
								elevation={0}
								sx={{
									p: 2,
									backgroundColor: 'warning.light',
									color: 'white'
								}}
							>
								<Typography variant="subtitle2">Authors:</Typography>
								<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
									{stats.uniqueAuthorsCount}
									<PersonOutlineIcon sx={{ ml: 1, verticalAlign: 'middle' }} />
								</Typography>
							</Paper>
						</Grid>

						<Grid>
							<Paper
								elevation={0}
								sx={{
									p: 2,
									backgroundColor: 'warning.dark',
									color: 'white'
								}}
							>
								<Typography variant="subtitle2">Articles:</Typography>
								<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
									{stats.totalArticles}
									<ArticleIcon sx={{ ml: 1, verticalAlign: 'middle' }} />
								</Typography>
							</Paper>
						</Grid>
						<Grid>
							<Paper
								elevation={0}
								sx={{ p: 2, backgroundColor: 'info.light', color: 'white' }}
							>
								<Typography variant="subtitle2">
									Average content length:
								</Typography>
								<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
									{stats.avgContentLength.toFixed(1)}
									<FormatSizeIcon sx={{ ml: 1, verticalAlign: 'middle' }} />
								</Typography>
							</Paper>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ mt: 3 }}>
						<Grid>
							<Paper
								elevation={0}
								sx={{ p: 2, backgroundColor: 'background.default' }}
							>
								<Typography variant="body1">
									<TrendingUpIcon
										color="success"
										sx={{ mr: 1, verticalAlign: 'bottom' }}
									/>
									Max content length: {stats.maxContentLength} symbols.
								</Typography>
							</Paper>
						</Grid>

						<Grid>
							<Paper
								elevation={0}
								sx={{ p: 2, backgroundColor: 'background.default' }}
							>
								<Typography variant="body1">
									<TrendingDownIcon
										color="error"
										sx={{ mr: 1, verticalAlign: 'bottom' }}
									/>
									Min content length: {stats.minContentLength} symbols.
								</Typography>
							</Paper>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ mt: 3 }}>
						<Grid>
							<Paper
								elevation={0}
								sx={{
									p: 2,
									borderLeft: '4px solid',
									borderColor: 'success.main'
								}}
							>
								<Typography
									variant="body1"
									sx={{ display: 'flex', alignItems: 'center' }}
								>
									<CalendarTodayIcon color="action" sx={{ mr: 1 }} />
									<Box component="span" sx={{ fontWeight: 'medium', pr: 1 }}>
										Oldest Articles Date:
									</Box>
									{new Date(stats.oldestArticleDate).toLocaleDateString()}
								</Typography>
							</Paper>
						</Grid>

						<Grid>
							<Paper
								elevation={0}
								sx={{
									p: 2,
									borderLeft: '4px solid',
									borderColor: 'warning.main'
								}}
							>
								<Typography
									variant="body1"
									sx={{ display: 'flex', alignItems: 'center' }}
								>
									<UpdateIcon color="action" sx={{ mr: 1 }} />
									<Box component="span" sx={{ fontWeight: 'medium', pr: 1 }}>
										Latest Articles Date:
									</Box>
									{new Date(stats.latestArticleDate).toLocaleDateString()}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Container>
	)
}
export default StatisticsPage
