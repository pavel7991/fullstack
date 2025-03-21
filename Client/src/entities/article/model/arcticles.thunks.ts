import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../shared/api/axios.ts'
import { AxiosError } from 'axios'
import { Article } from './types.ts'

// !GET All Articles
export const fetchArticles = createAsyncThunk<Article[], void>('articles/fetchArticles', async (_, thunkAPI) => {
  try {
    const response = await api.get('/articles')
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message && 'Failed to fetch articles'
      return thunkAPI.rejectWithValue(message)
    }
    return thunkAPI.rejectWithValue('Failed to fetch articles')
  }
})

// ! GET Article by ID
export const fetchArticleById = createAsyncThunk<Article, string>(
  'articles/fetchArticleById',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/articles/${id}`)
      return response.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Fetch article by id failed'
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue('Fetch article by id failed')
    }
  }
)
