import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../widgets/Layout/Layout.tsx'
import HomePage from '../../pages/Home/HomePage.tsx'
import ArticlesPage from '../../pages/Articles/ArticlesPage.tsx'
import ArticleDetailsPage from '../../pages/ArticleDetails/ArticleDetailsPage.tsx'
import NotFoundPage from '../../pages/NotFound/NotFoundPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', Component: HomePage },
      { path: '/articles', Component: ArticlesPage },
      { path: '/articles/:id', Component: ArticleDetailsPage },
      { path: '*', Component: NotFoundPage }
    ]
  }
])
