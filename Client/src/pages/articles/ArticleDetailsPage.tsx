import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { fetchArticleById } from '../../entities/article/model/arcticles.thunks.ts'
import { AppDispatch, RootState } from '../../app/store/store.ts'

const ArticleDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedArticle: article, loading, error } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={20}>
        <CircularProgress />
      </Box>
    )
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={20}>
        <h1>{error}</h1>
      </Box>
    )
  }
  if (!article) return <div>Article not found</div>

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  )
}
export default ArticleDetailsPage
