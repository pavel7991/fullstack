export interface ArticleInterface {
  id: number
  title: string
  content: string
}

export interface ArticleStateInterface {
  articles: ArticleInterface[]
  loading: boolean
  error: string | null
}
