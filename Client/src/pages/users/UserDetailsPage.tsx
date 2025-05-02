import { Box, Container } from '@mui/material'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../shared/api/axios.ts'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import ArticlesListRow from './ArticlesListRow.tsx'

const UserDetailsPage = () => {
	const { id } = useParams()
	const [user, setUser] = useState([])
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await api.get(`/users/${id}`)
				const { data } = response
				setUser(data.user)
				setArticles(data.articles)
			} catch (error) {
				setError(error.response.data.message)
			} finally {
				setLoading(false)
			}
		}

		fetchUser().catch()
	}, [])

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
			<TitlePage text={'User Details'} />
			<Box>
				<div>
					<p>Name: {user.username}</p>
					<p>Email: {user.email}</p>
				</div>
			</Box>

			{Array.isArray(articles) && articles.length > 1 && (
				<>
					<TitlePage text={'Articles by User'} component="h2" />
					<ArticlesListRow articles={articles} />
				</>
			)}
		</Container>
	)
}
export default UserDetailsPage
