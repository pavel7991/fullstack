import { Box, Card, CardContent, Typography } from '@mui/material'
import { Article } from '../model/types'
import Grid from '@mui/material/Grid2'
import NoImgBg from '../../../shared/ui/NoImgBg.tsx'

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
            {article?.img?.trim() ? (
              <Box
                component="img"
                src={article.img}
                alt={article.title}
                sx={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <NoImgBg />
            )}
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
