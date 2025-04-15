import { Alert, Snackbar } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'
import { hideSnackbar } from '../../features/modals/snackbarSlice.ts'

const AppSnackbar = () => {
	const dispatch = useAppDispatch()
	const { open, message, severity } = useAppSelector((state) => state.snackbar)

	const handleClose = () => {
		dispatch(hideSnackbar())
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert onClose={handleClose} severity={severity} variant="filled">
				{message}
			</Alert>
		</Snackbar>
	)
}

export default AppSnackbar
