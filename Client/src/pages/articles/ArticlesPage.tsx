import ArticleList from '../../widgets/ArticlesList/ArticleList.tsx'
import { Box, Button, Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import ModalApp from '../../features/modal/ModalApp.tsx'
import { useState } from 'react'
import CreateArticleForm from '../../features/article/ui/CreateArticleForm.tsx'

const ArticlesPage = () => {
	const [modalCreateArticle, setModalCreateArticle] = useState(false)

	return (
		<>
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
							onClick={() => setModalCreateArticle(true)}
						>
							Create new article
						</Button>
					</Box>
				</Box>
				<ArticleList />
			</Container>

			<ModalApp
				title={'Create new Article'}
				body={<CreateArticleForm />}
				open={modalCreateArticle}
				handleClose={() => setModalCreateArticle(false)}
			/>
		</>
	)
}
export default ArticlesPage
