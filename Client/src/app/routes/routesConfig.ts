import HomePage from '../../pages/home/HomePage.tsx'
import ArticlesPage from '../../pages/articles/ArticlesPage.tsx'
import ArticleDetailsPage from '../../pages/articles/ArticleDetailsPage.tsx'
import NotFoundPage from '../../pages/notFound/NotFoundPage.tsx'
import { ComponentType } from 'react'

interface routesConfig {
	path: string
	label?: string
	Component: ComponentType
}

export const routesConfig: routesConfig[] = [
	{ path: '/', label: 'Home', Component: HomePage },
	{ path: '/articles', label: 'All Articles', Component: ArticlesPage },
	{
		path: '/articles/:id',
		Component: ArticleDetailsPage
	},
	{ path: '*', label: '404 - Page Not Found', Component: NotFoundPage }
]
