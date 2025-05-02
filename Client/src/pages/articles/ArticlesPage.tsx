import ArticleList from '../../widgets/articles/ArticleList.tsx'
import { Box, Button, Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts'
import { openModal } from '../../features/modals/modalSlice.ts'

const ArticlesPage = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()

	const handleCreateArticle = () => {
		if (isAuthenticated) {
			dispatch(openModal('CREATE_ARTICLE'))
			return
		}
		dispatch(openModal('LOGIN'))
	}

	return (
		<Container>
			<AppBreadcrumbs />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<TitlePage text={'All Articles'} />
				<Box>
					<Button
						variant="contained"
						color="warning"
						onClick={handleCreateArticle}
					>
						Create new article
					</Button>
				</Box>
			</Box>
			<ArticleList />
		</Container>
	)
}
export default ArticlesPage
