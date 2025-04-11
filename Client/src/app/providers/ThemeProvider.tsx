import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { getAppTheme } from '../../shared/config/theme.ts'
import { ReactNode } from 'react'
import ModalManager from '../../features/modals/ModalManager.tsx'
import { useAppSelector } from '../store/hooks.ts'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const mode = useAppSelector((state) => state.theme.mode)
	const theme = getAppTheme(mode)

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
			<ModalManager />
		</MuiThemeProvider>
	)
}

export default ThemeProvider
