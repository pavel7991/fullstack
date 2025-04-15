import AppInit from './init/AppInit.tsx'
import StoreProvider from './providers/StoreProvider.tsx'
import RouterProvider from './providers/RouterProvider.tsx'
import ThemeProvider from './providers/ThemeProvider.tsx'
import AppSnackbar from '../shared/ui/AppSnackbar.tsx'

const App = () => {
	return (
		<StoreProvider>
			<AppInit />
			<ThemeProvider>
				<>
					<RouterProvider />
					<AppSnackbar />
				</>
			</ThemeProvider>
		</StoreProvider>
	)
}

export default App
