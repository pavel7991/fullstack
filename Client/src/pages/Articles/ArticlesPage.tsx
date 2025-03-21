import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import ArticleCard from '../../entities/article/ui/ArticleCard.tsx'
import { fetchArticles } from '../../entities/article/model/arcticles.thunks.ts'
import { Article } from '../../entities/article/model/types.ts'
import { AppDispatch, RootState } from '../../app/store/store.ts'

const ArticlesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading, error } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={20}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6">{error}</Typography>
      </Container>
    )
  }

  return (
    <Box>
      {articles.map((article: Article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Box>
  )
}
export default ArticlesPage
