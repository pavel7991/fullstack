import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getAppTheme } from '../theme'
import { ReactNode } from 'react'

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const theme = getAppTheme(mode)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default AppThemeProvider
