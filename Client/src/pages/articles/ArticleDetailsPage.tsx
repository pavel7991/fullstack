import { useParams } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import {
	deleteArticleById,
	fetchArticleById
} from '../../entities/article/model/articles.thunks.ts'
import ArticleCard from '../../entities/article/ui/ArticleCard.tsx'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'

const ArticleDetailsPage = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const {
		selectedArticle: article,
		loading,
		error,
		isOwner
	} = useAppSelector((state) => state.articles)

	const { user } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (id) {
			dispatch(fetchArticleById(id))
		}
	}, [id, user, dispatch])

	if (loading) return <Loader />
	if (error) return <ErrorFetch error={error} />
	if (!article) {
		return (
			<Container>
				<AppBreadcrumbs currentPathName={'Not found'} />
				<Typography variant="h4">Article not found</Typography>
			</Container>
		)
	}

	return (
		<Container>
			<AppBreadcrumbs currentPathName={article.title} />
			<ArticleCard article={article} />

			{isOwner && (
				<Button
					variant="contained"
					color="error"
					onClick={() => dispatch(deleteArticleById(article._id))}
				>
					Delete article
				</Button>
			)}
		</Container>
	)
}
export default ArticleDetailsPage
