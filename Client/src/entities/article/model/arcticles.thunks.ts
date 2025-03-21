import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../shared/api/axios.ts'
import { AxiosError } from 'axios'
import { Article } from './types.ts'

// !GET All articles
export const fetchArticles = createAsyncThunk<Article[], void>(
  'articles/fetchArticles',
  async (_, thunkAPI) => {
    try {
      const response = await api.get<Article[]>('/articles')
      return response.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.message || 'Failed to fetch articles'
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue('Reject')
    }
  }
)

// ! GET Article by ID
export const fetchArticleById = createAsyncThunk<Article, string>(
  'articles/fetchArticleById',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/articles/${id}`)
      return response.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.message || 'Failed to fetch article by ID'
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue('Reject')
    }
  }
)
