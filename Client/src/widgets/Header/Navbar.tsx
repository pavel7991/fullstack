import { List, ListItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const StyledLink = styled(NavLink)(({ theme }) => ({
	textDecoration: 'none',
	color: theme.palette.text.primary,
	'&.active': {
		color: theme.palette.primary.main,
		textDecoration: 'underline'
	},
	'&:hover': {
		textDecoration: 'underline'
	}
}))

const Navbar = () => {
	return (
		<List
			sx={{
				display: 'flex',
				justifyContent: 'start',
				ml: 2,
				fontSize: '1.2rem'
			}}
		>
			<ListItem>
				<StyledLink to="/">Home</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="/users">Users</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="/articles">Articles</StyledLink>
			</ListItem>
		</List>
	)
}
export default Navbar
