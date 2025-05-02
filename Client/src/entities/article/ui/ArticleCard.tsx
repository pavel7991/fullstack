import { Card, CardContent, Typography } from '@mui/material'
import { Article } from '../model/types'
import Grid from '@mui/material/Grid2'
import ArticleImage from '../../../shared/ui/ArticleImage.tsx'

interface ArticleCardProps {
	article: Article
}

const ArticleCard = ({ article }: ArticleCardProps) => {
	return (
		<Card sx={{ my: 5, px: 2 }}>
			<CardContent>
				<Typography variant="h4" component="h1" sx={{ my: 2 }}>
					{article.title}
				</Typography>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 5, md: 4 }}>
						<ArticleImage
							img={article.img}
							title={article.title}
							width={{ xs: '100%', sm: '100%' }}
							height={{ xs: 'auto', sm: 'auto' }}
							minHeight={{ xs: 240, sm: 240 }}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 7, md: 8 }}>
						<Typography variant="body1" color="text.secondary">
							{article.content}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

export default ArticleCard
