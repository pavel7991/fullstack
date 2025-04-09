import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../../shared/api/axios.ts'
import { logout } from './authSlice.ts'
import axios from 'axios'

export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get('/auth/me')
		return response.data
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const loginUser = createAsyncThunk('auth/login', async (userData, { dispatch, rejectWithValue }) => {
	try {
		const response = await api.post('/auth/login', userData)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response
			console.error(`${data.error} ${status} (${data.message})`)
			if (status === 400) {
				console.log('asdasd')
				return rejectWithValue(data.data || { global: ['Что-то пошло не так'] })
			}
		}

		if (error instanceof Error) {
			return rejectWithValue(error.message)
		} else {
			return rejectWithValue('An unknown error occurred')
		}
	}
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
	try {
		await api.post('/auth/logout')
		dispatch(logout())
	} catch (err) {
		return err
	}
})
