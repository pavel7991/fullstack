import { createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, loginUser } from './auth.thunk.ts'

interface UserInterface {
	id: string | null
	name: string | null
}

interface AuthStateInterface {
	isAuthenticated: boolean
	user: UserInterface
	loading: boolean
	error: string | null | object
}

const initialState: AuthStateInterface = {
	isAuthenticated: false,
	loading: false,
	user: {
		id: null,
		name: null
	},
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false
			state.loading = false
			state.error = null
			state.user.id = null
			state.user.name = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuthStatus.pending, (state) => {
				state.isAuthenticated = false
				state.loading = true
				state.user.id = null
				state.user.name = null
			})
			.addCase(checkAuthStatus.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.loading = false
				state.user.id = action.payload.id
				state.user.name = action.payload.username
			})
			.addCase(checkAuthStatus.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false
				state.user.id = null
				state.user.name = null
				state.error = action.payload || 'Ошибка сети или сервер не отвечает'
			})

			.addCase(loginUser.pending, (state) => {
				state.isAuthenticated = false
				state.user.id = null
				state.user.name = null
				state.loading = true
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.user.id = action.payload.id
				state.user.name = action.payload.username
				state.loading = false
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false
				state.user.id = null
				state.user.name = null
				state.error = action.payload || 'Ошибка сети или сервер не отвечает'
			})
	}
})

export const { logout } = authSlice.actions
export default authSlice.reducer
