import ArticleList from '../../widgets/ArticlesList/ArticleList.tsx'
import { Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'

const ArticlesPage = () => {
  return (
    <Container>
      <TitlePage text={'All Articles'} />
      <ArticleList />
    </Container>
  )
}
export default ArticlesPage
