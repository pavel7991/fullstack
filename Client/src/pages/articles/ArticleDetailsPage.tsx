import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { fetchArticleById } from '../../entities/article/model/arcticles.thunks.ts'
import { AppDispatch, RootState } from '../../app/store/store.ts'
import ArticleCard from '../../entities/article/ui/ArticleCard.tsx'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'

const ArticleDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const {
    selectedArticle: article,
    loading,
    error
  } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
    }
  }, [id, dispatch])

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
    </Container>
  )
}
export default ArticleDetailsPage
