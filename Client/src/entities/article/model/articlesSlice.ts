import { Article, ArticleState } from './types.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	deleteArticleById,
	fetchArticleById,
	fetchArticles,
	updateArticleById
} from './articles.thunks.ts'

const initialState: ArticleState = {
	articles: [],
	selectedArticle: null,
	loading: false,
	error: null,
	isOwner: false
}

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		addArticle: (state, action: PayloadAction<Article>) => {
			state.articles.unshift(action.payload)
		}
	},
	extraReducers: (builder) => {
		builder

			// * GET All articles
			.addCase(fetchArticles.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchArticles.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.loading = false
					state.articles = action.payload
				}
			)
			.addCase(fetchArticles.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

			// * GET Article by ID
			.addCase(fetchArticleById.pending, (state) => {
				state.loading = true
				state.error = null
				state.isOwner = false
			})
			.addCase(
				fetchArticleById.fulfilled,
				(
					state,
					action: PayloadAction<{ article: Article; isOwner: boolean }>
				) => {
					state.loading = false
					state.selectedArticle = action.payload.article
					state.isOwner = action.payload.isOwner
				}
			)
			.addCase(fetchArticleById.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
				state.isOwner = false
			})

			// * DELETE Article by ID
			.addCase(deleteArticleById.fulfilled, (state) => {
				state.selectedArticle = null
				state.isOwner = false
			})

			// * PUT Article by ID
			.addCase(updateArticleById.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateArticleById.fulfilled, (state, action) => {
				state.loading = false
				state.selectedArticle = action.payload.article
			})
			.addCase(updateArticleById.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const { addArticle } = articlesSlice.actions

export default articlesSlice.reducer
