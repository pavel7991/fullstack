import { matchRoutes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { routesConfig } from '../../app/routes/routesConfig.ts'

const UseTitlePage = () => {
  const location = useLocation()

  useEffect(() => {
    const matches = matchRoutes(routesConfig, location.pathname)

    if (matches && matches.length > 0) {
      const route = matches[matches.length - 1].route
      document.title = route.label || 'App page'
    } else {
      document.title = '404 - Page not found'
    }
  }, [location])
}

export default UseTitlePage
