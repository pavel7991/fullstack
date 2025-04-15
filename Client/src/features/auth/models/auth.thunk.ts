import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../shared/api/axios.ts'
import { logout } from './authSlice.ts'
import axios from 'axios'
import { LoginUserInterface, RegisterUserInterface } from './types.ts'

export const checkAuthStatus = createAsyncThunk(
	'auth/checkAuthStatus',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get('/auth/me')
			return response.data.user
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
			return response.data.user
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error.response?.data?.dataError || {
						global: ['Сервер не отвечает']
					}
				)
			}
			return rejectWithValue({ message: 'Unexpected error' })
		}
	}
)

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (data: RegisterUserInterface, { dispatch, rejectWithValue }) => {
		try {
			await api.post('/auth/register', data)
			await dispatch(
				loginUser({
					email: data.email,
					password: data.password
				})
			)
			return
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error.response?.data?.dataError || {
						global: ['Ошибка регистрации']
					}
				)
			}
			return rejectWithValue({ message: 'Unexpected error' })
		}
	}
)
