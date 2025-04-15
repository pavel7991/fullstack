import Header from '../Header/Header.tsx'
import { Outlet } from 'react-router-dom'
import useTitlePage from '../../shared/hooks/useTitlePage.ts'

const Layout = () => {
	useTitlePage()

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
export default Layout
