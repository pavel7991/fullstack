import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleInterface } from './articles.interface.ts'

export const fetchArticles = createAsyncThunk<ArticleInterface[], void>('articles/fetchArticles', async () => {
  const response = await fetch('http://localhost:5000/articles')
  const data = await response.json()
  return data as ArticleInterface[]
})
