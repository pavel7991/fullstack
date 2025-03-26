import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store/store.ts'
import { useEffect } from 'react'
import { fetchArticles } from '../../entities/article/model/arcticles.thunks.ts'
import { Article } from '../../entities/article/model/types.ts'
import { NavLink } from 'react-router-dom'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import NoImgBg from '../../shared/ui/NoImgBg.tsx'

const clampRows = (index: number) => {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: `${index}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const ArticleList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading, error } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  if (loading) return <Loader />
  if (error) return <ErrorFetch error={error} />

  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {articles.map((article: Article) => (
        <Grid
          key={article.id}
          component={Card}
          size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {article?.img?.trim() ? (
            <CardMedia component="img" alt={article.title} height="240" image={article.img} />
          ) : (
            <Box component={NoImgBg} sx={{ flexBasis: '240px' }} />
          )}

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography component="h3" variant="h5" gutterBottom sx={clampRows(2)}>
              {article.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={clampRows(4)}>
              {article.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={NavLink} to={`/articles/${article.id}`} size="small">
              Learn More
            </Button>
          </CardActions>
        </Grid>
      ))}
    </Grid>
  )
}
export default ArticleList
