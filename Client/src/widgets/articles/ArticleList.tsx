import {
	Box,
	Card,
	CardActions,
	CardContent,
	Link,
	Typography
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect } from 'react'
import { fetchArticles } from '../../entities/article/model/articles.thunks.ts'
import { Article } from '../../entities/article/model/types.ts'
import { NavLink } from 'react-router-dom'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'
import ArticleImage from '../../shared/ui/ArticleImage.tsx'
import { useClampText } from '../../shared/hooks/useClampText.ts'

const ArticleList = () => {
	const dispatch = useAppDispatch()
	const { articles, loading, error } = useAppSelector((state) => state.articles)
	const clampTitle = useClampText(2)
	const clampContent = useClampText(4)

	useEffect(() => {
		dispatch(fetchArticles())
	}, [dispatch])

	if (loading) return <Loader />
	if (error) return <ErrorFetch error={error} />

	return (
		<Grid container spacing={2} sx={{ mb: 5 }}>
			{articles.map((article: Article) => (
				<Grid
					key={article._id}
					component={Card}
					size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
					sx={{ display: 'flex', flexDirection: 'column' }}
				>
					<ArticleImage
						img={article.img}
						title={article.title}
						width={{ xs: '100%', sm: '100%' }}
						height={{ xs: 240, sm: 240 }}
					/>

					<CardContent sx={{ flexGrow: 1, px: 2 }}>
						<Typography
							component="h3"
							variant="h5"
							gutterBottom
							sx={clampTitle}
						>
							{article.title}
						</Typography>

						<Typography
							variant="body2"
							color="text.secondary"
							sx={clampContent}
						>
							{article.content}
						</Typography>
					</CardContent>
					<CardActions sx={{ px: 2 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '3px',
								width: '100%'
							}}
						>
							<Typography variant="caption" color="text.secondary">
								By:
							</Typography>
							<Link
								component={NavLink}
								to={`/users/${article.author._id}`}
								color="primary"
								sx={{ fontSize: '0.9rem' }}
							>
								{article.author.username}
							</Link>
							<Typography
								variant="caption"
								color="text.secondary"
								sx={{ marginLeft: 'auto' }}
							>
								{new Date(article.createdAt).toLocaleDateString()}
							</Typography>
						</Box>
					</CardActions>
				</Grid>
			))}
		</Grid>
	)
}
export default ArticleList
