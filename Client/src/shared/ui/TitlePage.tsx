import { Typography } from '@mui/material'
import { ElementType } from 'react'

type TitlePageProps = {
	text: string
	component?: ElementType
}

const TitlePage = ({ text, component = 'h1' }: TitlePageProps) => {
	return (
		<Typography variant="h4" component={component} sx={{ my: 5, mb: 3 }}>
			{text}
		</Typography>
	)
}
export default TitlePage
