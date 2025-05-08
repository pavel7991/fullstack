import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ModalType =
	| 'LOGIN'
	| 'REGISTER'
	| 'CREATE_ARTICLE'
	| 'EDIT_ARTICLE'
	| null

interface ModalState {
	modalType: ModalType
	isOpen: boolean
}

const initialState: ModalState = {
	modalType: null,
	isOpen: false
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<ModalType>) => {
			state.modalType = action.payload
			state.isOpen = true
		},
		closeModal: (state) => {
			state.modalType = null
			state.isOpen = false
		}
	}
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
