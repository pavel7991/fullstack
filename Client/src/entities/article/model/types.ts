export interface Article {
  id: number
  title: string
  content: string
  img: string
}

export interface ArticleState {
  articles: Article[]
  selectedArticle: Article | null
  loading: boolean
  error: string | null
}
