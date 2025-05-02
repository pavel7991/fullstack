import { Container, Link } from '@mui/material'

import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { useEffect, useState } from 'react'
import api from '../../shared/api/axios.ts'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { NavLink } from 'react-router-dom'

const AllUsersPage = () => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await api.get('/users')
				setUsers(response.data)
			} catch (error) {
				console.error(error)
				setError('Error fetching users')
			} finally {
				setLoading(false)
			}
		}

		fetchUsers().catch()
	}, [])

	if (loading) return <Loader />
	if (error)
		return (
			<Container>
				<AppBreadcrumbs />
				<ErrorFetch error={error} />
			</Container>
		)

	return (
		<Container>
			<AppBreadcrumbs />
			<TitlePage text={'All Users'} />

			<ul>
				{users.map((user) => (
					<li key={user._id}>
						<Link component={NavLink} to={`/users/${user._id}`}>
							{user.username}
						</Link>
					</li>
				))}
			</ul>
		</Container>
	)
}
export default AllUsersPage
