import { AppBar, Container, Typography, Button, Box } from '@mui/material'
import SwitchTheme from '../../shared/ui/SwitchThemeButton.tsx'
import Navbar from './Navbar.tsx'
import { logoutUser } from '../../features/auth/models/auth.thunk.ts'

import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'
import { openModal } from '../../features/modals/modalSlice.ts'

const Header = () => {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<>
			<AppBar position="sticky" color="inherit" sx={{ py: 1 }}>
				<Container>
					<Box
						sx={{
							px: '0',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<Typography variant="h5" color="textSecondary">
							My App
						</Typography>
						<Navbar />
						<SwitchTheme />

						{isAuthenticated && (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 2,
									justifyContent: 'center'
								}}
							>
								<Typography>{user.name}</Typography>
								<Button
									variant="outlined"
									color="inherit"
									size="small"
									onClick={handleLogout}
								>
									Logout
								</Button>
							</Box>
						)}

						{isAuthenticated !== null && !isAuthenticated && (
							<>
								<Button
									variant="outlined"
									color="inherit"
									size="small"
									onClick={() => dispatch(openModal('LOGIN'))}
								>
									Login
								</Button>
								<Button
									variant="contained"
									color="warning"
									size="small"
									sx={{ ml: 2 }}
									onClick={() => dispatch(openModal('REGISTER'))}
								>
									Sing up
								</Button>
							</>
						)}
					</Box>
				</Container>
			</AppBar>
		</>
	)
}
export default Header
