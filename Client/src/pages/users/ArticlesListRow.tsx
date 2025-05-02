import React from 'react'
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Stack,
	Link
} from '@mui/material'
import { NavLink } from 'react-router-dom'

type Article = {
	_id: string
	title: string
	content: string
	img?: string
	createdAt?: string
}

type ArticlesListRowProps = {
	articles: Article[]
}

const ArticlesListRow: React.FC<ArticlesListRowProps> = ({ articles }) => {
	return (
		<Stack spacing={2} sx={{ padding: 2 }}>
			{articles.map((article) => (
				<Card
					key={article._id}
					sx={{
						display: 'flex',
						width: '100%',
						flexDirection: { xs: 'column', sm: 'row' },
						boxShadow: 3,
						borderRadius: 2
					}}
				>
					{article.img && (
						<CardMedia
							component="img"
							image={article.img}
							alt={article.title}
							sx={{
								width: { xs: '100%', sm: 250 },
								height: { xs: 200, sm: 'auto' },
								objectFit: 'cover'
							}}
						/>
					)}

					<CardContent sx={{ flex: 1 }}>
						<Link
							variant="h6"
							component={NavLink}
							to={`/articles/${article._id}`}
							gutterBottom
						>
							{article.title}
						</Link>
						<Typography variant="body2" color="text.secondary">
							{article.content}
						</Typography>
						{article.createdAt && (
							<Typography variant="caption" color="text.secondary">
								{new Date(article.createdAt).toLocaleDateString()}
							</Typography>
						)}
					</CardContent>
				</Card>
			))}
		</Stack>
	)
}

export default ArticlesListRow
