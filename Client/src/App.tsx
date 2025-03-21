import AppThemeProvider from './providers/ThemeProvider.tsx'
import AppRouterProvider from './providers/RouterProvider.tsx'

const App = () => {
  return (
    <AppThemeProvider>
      <AppRouterProvider />
    </AppThemeProvider>
  )
}

export default App
