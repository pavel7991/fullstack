import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success'

interface SnackbarState {
	open: boolean
	message: string
	severity: SnackbarSeverity
}

const initialState: SnackbarState = {
	open: false,
	message: '',
	severity: 'info'
}

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		showSnackbar: (
			state,
			action: PayloadAction<{ message: string; severity?: SnackbarSeverity }>
		) => {
			state.open = true
			state.message = action.payload.message
			state.severity = action.payload.severity || 'info'
		},
		hideSnackbar: (state) => {
			state.open = false
			state.message = ''
			state.severity = 'info'
		}
	}
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
