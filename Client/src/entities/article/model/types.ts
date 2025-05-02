export interface ArticleCreateRequest {
	title: string
	content: string
	img?: string
	userID: string | null
}

export interface Article extends ArticleCreateRequest {
	_id: string
}

export interface ArticleState {
	articles: Article[]
	selectedArticle: Article | null
	loading: boolean
	error: string | null
}
