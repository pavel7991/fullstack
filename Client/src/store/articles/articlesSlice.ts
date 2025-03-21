import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleInterface, ArticleStateInterface } from './articles.interface.ts'
import { fetchArticles } from './articles.thunks.ts'

const initialState: ArticleStateInterface = {
  articles: [],
  loading: false,
  error: null
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleInterface[]>) => {
        state.loading = false
        state.articles = action.payload
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch articles'
      })
  }
})

export default articlesSlice.reducer
