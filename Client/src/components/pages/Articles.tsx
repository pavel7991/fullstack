import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { AppDispatch, RootState } from '../../store/store.ts'
import { Container } from '@mui/material'
import TitlePage from '../TitlePage.tsx'
import { fetchArticles } from '../../store/articles'

const Articles = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading, error } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <TitlePage text={'All Articles'} />

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
export default Articles
