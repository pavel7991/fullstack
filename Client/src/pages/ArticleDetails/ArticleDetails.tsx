import { Article } from '../../entities/article/model/types.ts'
import { FC } from 'react'

interface ArticleDetailsProps {
  article: Article
}

const ArticleDetails: FC<ArticleDetailsProps> = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  )
}
export default ArticleDetails
