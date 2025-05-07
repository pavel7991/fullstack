import { Paper, Typography, Box } from '@mui/material'
import { Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material'
import { User } from '../model/types.ts'

const UserInfo = ({ user }: { user: User }) => (
	<Paper
		elevation={2}
		sx={{
			p: 3,
			width: '100%',
			borderRadius: 2,
			backgroundColor: 'background.paper',
			mt: 5,
			mb: 3
		}}
	>
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
			<Box
				sx={{
					width: 60,
					height: 60,
					borderRadius: '50%',
					backgroundColor: 'primary.light',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'primary.contrastText',
					fontSize: 24
				}}
			>
				<PersonIcon fontSize="medium" />
			</Box>

			<Typography variant="h5" sx={{ fontWeight: 600 }}>
				{user.username}
			</Typography>
		</Box>

		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				pl: 9
			}}
		>
			<EmailIcon
				fontSize="medium"
				color="secondary"
				sx={{ color: 'secondary.main' }}
			/>
			<Typography variant="body1" sx={{ color: 'text.primary' }}>
				{user.email}
			</Typography>
		</Box>
	</Paper>
)

export default UserInfo
