import { createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, loginUser } from './auth.thunk.ts'

interface AuthStateInterface {
	isAuthenticated: boolean
	error: string | null | unknown
}

const initialState: AuthStateInterface = {
	isAuthenticated: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true
		},
		logout: (state) => {
			state.isAuthenticated = false
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuthStatus.pending, (state) => {
				state.isAuthenticated = false
			})
			.addCase(checkAuthStatus.fulfilled, (state) => {
				state.isAuthenticated = true
			})
			.addCase(checkAuthStatus.rejected, (state, action) => {
				state.error = action.payload
				state.isAuthenticated = false
			})

			.addCase(loginUser.pending, (state) => {
				state.isAuthenticated = false
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.isAuthenticated = true
				state.error = null
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false
				state.error = action.payload
			})
	}
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
