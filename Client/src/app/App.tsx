import AppThemeProvider from './providers/ThemeProvider.tsx'
import AppRouterProvider from './providers/RouterProvider.tsx'
import AppInit from './providers/AppInit.tsx'

const App = () => {
	return (
		<>
			<AppInit />
			<AppThemeProvider>
				<AppRouterProvider />
			</AppThemeProvider>
		</>
	)
}

export default App
