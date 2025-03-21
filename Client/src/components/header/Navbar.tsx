import { routes } from '../../config/routes.config.ts'
import { Link, List, ListItem } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <List sx={{ display: 'flex', justifyContent: 'start', ml: 2 }}>
      {routes.map((route) => (
        <ListItem key={route.path}>
          <Link
            component={NavLink}
            to={route.path}
            underline={location.pathname === route.path ? 'always' : 'hover'}
            color={location.pathname === route.path ? 'warning' : 'primary'}
            sx={{ fontSize: '1.2rem' }}
          >
            {route.label}
          </Link>
        </ListItem>
      ))}
    </List>
  )
}
export default Navbar
