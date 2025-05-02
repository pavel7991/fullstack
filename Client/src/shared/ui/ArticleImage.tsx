import { CardMedia, Box } from '@mui/material'
import HideImageIcon from '@mui/icons-material/HideImage'
import { ResponsiveStyleValue } from '@mui/system'

interface ArticleImageProps {
	img?: string
	title: string
	width?: ResponsiveStyleValue<string | number>
	height?: ResponsiveStyleValue<string | number>
	minHeight?: ResponsiveStyleValue<string | number>
}

const ArticleImage = ({
	img,
	title,
	width = { xs: '100%', sm: 250 },
	height = { xs: 200, sm: 'auto' },
	minHeight = { xs: 'auto', sm: 'auto' }
}: ArticleImageProps) => {
	if (img) {
		return (
			<CardMedia
				component="img"
				image={img}
				alt={title}
				sx={{
					width,
					height,
					minHeight,
					objectFit: 'cover'
				}}
			/>
		)
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				width,
				height,
				minHeight,
				backgroundColor: '#ccc'
			}}
		>
			<HideImageIcon fontSize="large" />
		</Box>
	)
}

export default ArticleImage
