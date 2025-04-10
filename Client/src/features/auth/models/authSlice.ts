import { createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, loginUser } from './auth.thunk.ts'

interface AuthStateInterface {
	isAuthenticated: boolean
	loading: boolean
	error: string | null | object
}

const initialState: AuthStateInterface = {
	isAuthenticated: false,
	loading: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		},
		logout: (state) => {
			state.isAuthenticated = false
			state.loading = false
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuthStatus.pending, (state) => {
				state.isAuthenticated = false
				state.loading = true
			})
			.addCase(checkAuthStatus.fulfilled, (state) => {
				state.isAuthenticated = true
				state.loading = false
			})
			.addCase(checkAuthStatus.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false
				state.error = action.payload || 'Ошибка сети или сервер не отвечает'
			})

			.addCase(loginUser.pending, (state) => {
				state.isAuthenticated = false
				state.loading = true
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.isAuthenticated = true
				state.loading = false
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false
				state.error = action.payload || 'Ошибка сети или сервер не отвечает'
			})
	}
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
