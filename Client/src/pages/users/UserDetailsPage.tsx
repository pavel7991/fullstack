import { Container } from '@mui/material'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import { useParams } from 'react-router-dom'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import ArticlesListRow from '../../widgets/articles/ArticlesListRow.tsx'
import { useUserDetails } from '../../entities/user/model/hooks.ts'
import UserInfo from '../../entities/user/ui/UserInfo.tsx'

const UserDetailsPage = () => {
	const { id = '' } = useParams()
	const { user, articles, loading, error } = useUserDetails(id)

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

			{user && <UserInfo user={user} />}
			{articles.length > 0 && (
				<>
					<TitlePage text={'Articles by User'} component="h2" />
					<ArticlesListRow articles={articles} />
				</>
			)}
		</Container>
	)
}
export default UserDetailsPage
