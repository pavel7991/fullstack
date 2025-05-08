import { useParams } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
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

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { openModal } from '../../features/modals/modalSlice.ts'

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
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						onClick={() => dispatch(openModal('EDIT_ARTICLE'))}
						variant="outlined"
						color="warning"
						startIcon={<EditIcon />}
						sx={{
							borderRadius: '8px',
							textTransform: 'none',
							px: 3,
							py: 1,
							borderWidth: 2,
							fontWeight: 500,
							letterSpacing: 0.5,
							position: 'relative',
							overflow: 'hidden',
							transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
							'&:hover': {
								transform: 'translateY(-1px)',
								boxShadow: '0 10px 20px rgba(255, 167, 38, 0.2)',
								backgroundColor: 'rgba(255, 167, 38, 0.08)',
								borderColor: 'warning.dark',
								'&::before': {
									transform: 'scaleX(1)',
									opacity: 1
								}
							},
							'&::before': {
								content: '""',
								position: 'absolute',
								bottom: 0,
								left: 0,
								width: '100%',
								height: 2,
								backgroundColor: 'warning.main',
								transform: 'scaleX(0)',
								transformOrigin: 'left',
								transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
								opacity: 0
							}
						}}
					>
						Edit
					</Button>

					<Button
						variant="outlined"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={() => dispatch(deleteArticleById(article._id))}
						sx={{
							borderRadius: '8px',
							textTransform: 'none',
							px: 3,
							py: 1,
							ml: 2,
							borderWidth: 2,
							fontWeight: 500,
							letterSpacing: 0.5,
							position: 'relative',
							overflow: 'hidden',
							transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
							'&:hover': {
								transform: 'translateY(-1px)',
								boxShadow: '0 10px 20px rgba(244, 67, 54, 0.2)',
								backgroundColor: 'rgba(244, 67, 54, 0.08)',
								borderColor: 'error.dark',
								'&::after': {
									width: '100%',
									left: 0
								}
							},
							'&::after': {
								content: '""',
								position: 'absolute',
								bottom: 0,
								right: 0,
								width: 0,
								height: 2,
								backgroundColor: 'error.main',
								transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
							}
						}}
					>
						Delete article
					</Button>
				</Box>
			)}
		</Container>
	)
}
export default ArticleDetailsPage
