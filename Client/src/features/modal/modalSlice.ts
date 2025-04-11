import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'

interface ActionInterface {
	title: string | ReactNode
	body: ReactNode | null
}

interface InitialStateInterface extends ActionInterface {
	open: boolean
}

const initialState: InitialStateInterface = {
	open: false,
	title: '',
	body: null
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (state, action: PayloadAction<ActionInterface>) => {
			state.open = true
			state.title = action.payload.title
			state.body = action.payload.body
		},
		hideModal: (state) => {
			state.open = false
			state.title = ''
			state.body = null
		}
	}
})

export const { showModal, hideModal } = modalSlice.actions
export default modalSlice.reducer
