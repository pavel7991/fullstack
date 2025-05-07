import { Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { useStats } from '../../entities/statistics/model/hooks.ts'
import Statistics from '../../entities/statistics/ui/Statistics.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'

const StatisticsPage = () => {
	const { stats, loading, error } = useStats()

	if (loading) return <Loader />
	if (error)
		return (
			<Container>
				<AppBreadcrumbs />
				<ErrorFetch error={error} />
			</Container>
		)

	return (
		<Container>
			<AppBreadcrumbs />
			<TitlePage text={'Blog Statistics'} />
			{stats && !stats.message && <Statistics stats={stats} />}
			{stats && stats.message && <ErrorFetch error={stats.message} />}
		</Container>
	)
}
export default StatisticsPage
