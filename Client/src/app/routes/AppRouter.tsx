import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../widgets/Layout/Layout.tsx'
import { routesConfig } from './routesConfig.ts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routesConfig
  }
])
