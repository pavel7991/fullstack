import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store.ts'
import { getAppTheme } from '../../shared/config/theme.ts'
import { ReactNode } from 'react'
import ModalManager from '../../features/modal/ModalManager.tsx'

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
	const mode = useSelector((state: RootState) => state.theme.mode)
	const theme = getAppTheme(mode)

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
			<ModalManager />
		</MuiThemeProvider>
	)
}

export default AppThemeProvider
