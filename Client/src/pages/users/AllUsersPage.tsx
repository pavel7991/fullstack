import { Container, Link, List, ListItem } from '@mui/material'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { NavLink } from 'react-router-dom'
import { useUsers } from '../../entities/user/model/hooks.ts'

const AllUsersPage = () => {
	const { users, loading, error } = useUsers()

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

			<List>
				{users.map((user, index) => (
					<ListItem key={user._id}>
						<Link component={NavLink} to={`/users/${user._id}`}>
							{`${++index}. `}
							{user.username}
						</Link>
					</ListItem>
				))}
			</List>
		</Container>
	)
}
export default AllUsersPage
