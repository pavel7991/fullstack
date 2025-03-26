export interface ArticleCreateRequest {
  title: string
  content: string
  img?: string
}

export interface Article extends ArticleCreateRequest {
  id: number
}

export interface ArticleState {
  articles: Article[]
  selectedArticle: Article | null
  loading: boolean
  error: string | null
}
