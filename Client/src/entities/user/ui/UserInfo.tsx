import { Typography, Stack } from '@mui/material'
import { User } from '../model/types'

const UserInfo = ({ user }: { user: User }) => (
	<Stack spacing={1} sx={{ mb: 2 }}>
		<Typography>Name: {user.username}</Typography>
		<Typography>Email: {user.email}</Typography>
	</Stack>
)

export default UserInfo
