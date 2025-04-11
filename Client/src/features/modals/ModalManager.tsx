import ModalApp from '../../shared/ui/ModalApp.tsx'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'
import LoginUserForm from '../auth/ui/LoginUserForm.tsx'
import RegisterUserForm from '../auth/ui/RegisterUserForm.tsx'
import { closeModal } from './modalSlice.ts'
import { ReactNode } from 'react'

interface ModalConfigItem {
	title: string
	body: ReactNode
}

const modalConfig: Record<string, ModalConfigItem> = {
	LOGIN: {
		title: 'Login',
		body: <LoginUserForm />
	},
	REGISTER: {
		title: 'Register',
		body: <RegisterUserForm />
	}
}

const ModalManager = () => {
	const dispatch = useAppDispatch()
	const { modalType, isOpen } = useAppSelector((state) => state.modal)
	const handleClose = () => dispatch(closeModal())

	if (!modalType) return null

	const { title, body } = modalConfig[modalType]

	return (
		<ModalApp
			open={isOpen}
			handleClose={handleClose}
			title={title}
			body={body}
		/>
	)
}
export default ModalManager
