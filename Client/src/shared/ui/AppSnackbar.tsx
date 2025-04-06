import { Alert, Snackbar } from '@mui/material'

interface AppSnackbarProps {
	open: boolean
	message: string
	onClose: () => void
}

const AppSnackbar = ({ open, message, onClose }: AppSnackbarProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert onClose={onClose} severity="error" variant="filled">
				{message}
			</Alert>
		</Snackbar>
	)
}

export default AppSnackbar
