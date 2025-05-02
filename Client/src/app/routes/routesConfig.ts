import HomePage from '../../pages/home/HomePage.tsx'
import ArticlesPage from '../../pages/articles/ArticlesPage.tsx'
import ArticleDetailsPage from '../../pages/articles/ArticleDetailsPage.tsx'
import NotFoundPage from '../../pages/notFound/NotFoundPage.tsx'
import { ComponentType } from 'react'
import AllUsersPage from '../../pages/users/AllUsersPage.tsx'
import UserDetailsPage from '../../pages/users/UserDetailsPage.tsx'
import StatisticsPage from '../../pages/statistics/StatisticsPage.tsx'
import ArticlesCursor from '../../pages/articles/ArticlesCursor.tsx'

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
	{
		path: '/articles/cursor',
		Component: ArticlesCursor
	},
	{
		path: '/users',
		label: 'Users',
		Component: AllUsersPage
	},
	{
		path: '/users/:id',
		label: 'User Details',
		Component: UserDetailsPage
	},
	{
		path: '/statistics',
		label: 'Blog Statistics',
		Component: StatisticsPage
	},
	{ path: '*', label: '404 - Page Not Found', Component: NotFoundPage }
]
