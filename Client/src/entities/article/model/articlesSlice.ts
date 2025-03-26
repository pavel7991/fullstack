import { Article, ArticleState } from './types.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleById, fetchArticles } from './arcticles.thunks.ts'

const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  loading: false,
  error: null
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
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false
        state.articles = action.payload
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // * Get Article by ID
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false
        state.selectedArticle = action.payload
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { addArticle } = articlesSlice.actions

export default articlesSlice.reducer
