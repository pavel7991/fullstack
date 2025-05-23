import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../shared/api/axios.ts'
import { AxiosError } from 'axios'
import { Article, ArticleUpdateRequest } from './types.ts'
import { updateArticleRequest } from '../../../features/article/models/api.ts'

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
export const fetchArticleById = createAsyncThunk<
	{ article: Article; isOwner: boolean },
	string
>('articles/fetchArticleById', async (id: string, thunkAPI) => {
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
})

// ! DELETE Article by ID

export const deleteArticleById = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>('articles/deleteArticleById', async (id, thunkAPI) => {
	try {
		await api.delete(`/articles/${id}`)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message = error.message || 'Failed to delete article'
			return thunkAPI.rejectWithValue(message)
		}
		return thunkAPI.rejectWithValue('Reject')
	}
})

// ! PUT Article by ID

export const updateArticleById = createAsyncThunk<
	{ article: Article; message: string },
	{ id: string; data: ArticleUpdateRequest },
	{ rejectValue: string }
>('articles/updateArticleById', async ({ id, data }, thunkAPI) => {
	try {
		return await updateArticleRequest(id, data)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message = error.message || 'Failed to update article'
			return thunkAPI.rejectWithValue(message)
		}
		return thunkAPI.rejectWithValue('Reject')
	}
})
