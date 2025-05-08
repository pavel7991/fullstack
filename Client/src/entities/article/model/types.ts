import { User } from '../../user/model/types.ts'

export interface ArticleCreateRequest {
	title: string
	content: string
	img?: string
	userID: string | null
}

export interface Article extends ArticleCreateRequest {
	_id: string
	createdAt: string
	updatedAt: string
	author: User
}

export interface ArticleState {
	articles: Article[]
	selectedArticle: Article | null
	loading: boolean
	error: string | null
	isOwner: boolean | null
}
