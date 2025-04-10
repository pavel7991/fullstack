import { AppBar, Container, Typography, Button, Box } from '@mui/material'
import SwitchTheme from '../../shared/ui/SwitchThemeButton.tsx'
import Navbar from './Navbar.tsx'
import ModalApp from '../../shared/ui/ModalApp.tsx'
import RegisterUserForm from '../../features/auth/ui/RegisterUserForm.tsx'
import { useState } from 'react'
import LoginUserForm from '../../features/auth/ui/LoginUserForm.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store/store.ts'
import { logoutUser } from '../../features/auth/models/auth.thunk.ts'

const Header = () => {
	const [modalRegister, setModalRegister] = useState(false)
	const [modalLogin, setModalLogin] = useState(false)
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch<AppDispatch>()
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
							<Button
								variant="outlined"
								color="inherit"
								size="small"
								onClick={handleLogout}
							>
								Logout
							</Button>
						)}
						{!isAuthenticated && (
							<>
								<Button
									variant="outlined"
									color="inherit"
									size="small"
									onClick={() => {
										setModalLogin(true)
									}}
								>
									Login
								</Button>
								<Button
									variant="contained"
									color="warning"
									size="small"
									sx={{ ml: 2 }}
									onClick={() => setModalRegister(true)}
								>
									Sing up
								</Button>
							</>
						)}
					</Box>
				</Container>
			</AppBar>

			{!isAuthenticated && (
				<>
					<ModalApp
						title={'Login'}
						body={<LoginUserForm />}
						open={modalLogin}
						handleClose={() => setModalLogin(false)}
					/>
					<ModalApp
						title={'Registration'}
						body={<RegisterUserForm />}
						open={modalRegister}
						handleClose={() => setModalRegister(false)}
					/>
				</>
			)}
		</>
	)
}
export default Header
