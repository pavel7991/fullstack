import { router } from '../routes/AppRouter.tsx'
import { RouterProvider as Router } from 'react-router-dom'

const AppRouterProvider = () => {
  return <Router router={router} />
}

export default AppRouterProvider
