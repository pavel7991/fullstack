import { Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import Hero from '../../widgets/hero/Hero.tsx'

const HomePage = () => {
	return (
		<>
			<Hero />
			<Container>
				<TitlePage text={'Home Page'} />
			</Container>
		</>
	)
}
export default HomePage
