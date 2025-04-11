import { router } from '../routes/AppRouter.tsx'
import { RouterProvider as Router } from 'react-router-dom'

const RouterProvider = () => {
	return <Router router={router} />
}

export default RouterProvider
