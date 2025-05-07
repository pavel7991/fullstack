import {
	Box,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography
} from '@mui/material'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import Loader from '../../shared/ui/Loader.tsx'
import ErrorFetch from '../../shared/ui/ErrorFetch.tsx'
import { NavLink } from 'react-router-dom'
import { useUsers } from '../../entities/user/model/hooks.ts'
import { Fragment } from 'react'

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

			<Paper elevation={12} sx={{ margin: 'auto', mt: 4, overflow: 'hidden' }}>
				<List sx={{ width: '100%', backgroundColor: 'background.paper', p: 0 }}>
					{users.map((user, index) => (
						<Fragment key={user._id}>
							<ListItem
								component={NavLink}
								to={`/users/${user._id}`}
								sx={{
									transition: 'all 0.3s ease',
									'&:hover': {
										backgroundColor: 'action.hover',
										transform: 'translateY(-2px)',
										boxShadow: 1
									},
									transform: 'translateY(0)',
									boxShadow: 0,
									cursor: 'pointer',
									py: 2,
									textDecoration: 'none',
									color: 'inherit'
								}}
							>
								<Box
									sx={{
										width: 24,
										height: 24,
										backgroundColor: 'warning.main',
										color: 'white',
										borderRadius: '4px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mr: 2,
										fontSize: '0.8rem',
										transition: 'transform 0.3s ease',
										transform: 'scale(1)',
										'&:hover': {
											transform: 'scale(1.1)'
										}
									}}
								>
									{index + 1}
								</Box>
								<ListItemText
									primary={
										<Typography
											component="span"
											sx={{
												fontWeight: 'medium',
												display: 'block'
											}}
										>
											{user.username}
										</Typography>
									}
									secondary={
										<Typography
											component="span"
											variant="body2"
											color="text.secondary"
											sx={{ display: 'block' }}
										>
											ID: {user._id}
										</Typography>
									}
								/>
							</ListItem>
							{index < users.length - 1 && <Divider />}
						</Fragment>
					))}
				</List>
			</Paper>
		</Container>
	)
}
export default AllUsersPage
