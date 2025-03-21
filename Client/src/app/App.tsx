import AppThemeProvider from './providers/ThemeProvider.tsx'
import AppRouterProvider from './providers/RouterProvider.tsx'
import AppStoreProvider from './providers/StoreProvider.tsx'

const App = () => {
  return (
    <AppStoreProvider>
      <AppThemeProvider>
        <AppRouterProvider />
      </AppThemeProvider>
    </AppStoreProvider>
  )
}

export default App
