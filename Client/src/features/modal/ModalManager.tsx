import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store/store.ts'
import { hideModal } from './modalSlice.ts'
import ModalApp from './ModalApp.tsx'

const ModalManager = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { open, title, body } = useSelector((state: RootState) => state.modal)
	const handleClose = () => dispatch(hideModal())

	return (
		<ModalApp open={open} handleClose={handleClose} title={title} body={body} />
	)
}
export default ModalManager
