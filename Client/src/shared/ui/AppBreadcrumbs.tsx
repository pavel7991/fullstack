import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'

interface MUIBreadcrumbsProps {
  currentPathName?: string
}

export const AppBreadcrumbs = ({ currentPathName }: MUIBreadcrumbsProps) => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter((x) => x)

  if (currentPathName) document.title = currentPathName

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Home
      </Link>

      {pathSegments.map((name, index) => {
        const routeTo = '/' + pathSegments.slice(0, index + 1).join('/')
        const isLast = index === pathSegments.length - 1

        return isLast ? (
          <Typography key={name} color="text.primary">
            {currentPathName ? currentPathName : decodeURIComponent(name)}
          </Typography>
        ) : (
          <Link component={RouterLink} to={routeTo} underline="hover" color="inherit" key={name}>
            {decodeURIComponent(name)}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
