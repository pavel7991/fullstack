import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../shared/api/axios.ts'
import { logout } from './authSlice.ts'
import axios from 'axios'
import { LoginUserInterface } from './types.ts'

export const checkAuthStatus = createAsyncThunk(
	'auth/checkAuthStatus',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get('/auth/me')
			return response.data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error.response?.data || { message: error.message }
				)
			}
			return rejectWithValue('Unexpected error')
		}
	}
)

export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { dispatch }) => {
		try {
			await api.post('/auth/logout')
			dispatch(logout())
		} catch (err) {
			return err
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async (data: LoginUserInterface, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login', data)
			return response.data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error.response?.data?.dataError || { global: ['Что-то пошло не так'] }
				)
			}
			return rejectWithValue({ message: 'Unexpected error' })
		}
	}
)
