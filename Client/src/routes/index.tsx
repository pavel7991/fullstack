import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout.tsx'
import NotFound from '../components/pages/NotFound.tsx'
import { routes } from '../config/routes.config.ts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...routes.map(({ path, Component }) => ({
        path: path.slice(1),
        element: <Component />
      })),
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])
