import { Container } from '@mui/material'
import Button from '@mui/material/Button'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { useEffect, useState } from 'react'
import api from '../../shared/api/axios.ts'
import { AxiosError } from 'axios'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import ArticlesListRow from '../../widgets/articles/ArticlesListRow.tsx'
import { Article } from '../../entities/article/model/types.ts'

const ArticlesCursor = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [cursor, setCursor] = useState(null)
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<null | string>(null)

	const fetchArticlesCursor = async () => {
		if (loading || !hasMore) return

		setLoading(true)

		try {
			const params = cursor ? { cursor } : {}
			const response = await api.get('/articles/cursor', { params })

			setArticles((prev) => [...prev, ...response.data.articles])
			setCursor(response.data.nextCursor)
			setHasMore(Boolean(response.data.nextCursor))
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error?.response?.data?.message || 'Error fetching articles')
			} else {
				setError('An unexpected error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchArticlesCursor().catch()
	}, [])

	if (error) return <ErrorFetch error={error} />

	return (
		<Container>
			<TitlePage text={'Articles Cursor'} />

			{articles && articles.length > 0 && (
				<ArticlesListRow articles={articles} />
			)}
			{hasMore && (
				<Button
					variant="contained"
					onClick={fetchArticlesCursor}
					disabled={loading}
					sx={{ mt: 3 }}
				>
					{loading ? 'Loading...' : 'Load more'}
				</Button>
			)}
		</Container>
	)
}
export default ArticlesCursor
