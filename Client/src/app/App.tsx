import AppInit from './init/AppInit.tsx'
import StoreProvider from './providers/StoreProvider.tsx'
import RouterProvider from './providers/RouterProvider.tsx'
import ThemeProvider from './providers/ThemeProvider.tsx'

const App = () => {
	return (
		<StoreProvider>
			<AppInit />
			<ThemeProvider>
				<RouterProvider />
			</ThemeProvider>
		</StoreProvider>
	)
}

export default App
