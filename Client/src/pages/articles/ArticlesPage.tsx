import ArticleList from '../../widgets/ArticlesList/ArticleList.tsx'
import { Box, Button, Container } from '@mui/material'
import TitlePage from '../../shared/ui/TitlePage.tsx'
import { AppBreadcrumbs } from '../../shared/ui/AppBreadcrumbs.tsx'
import ModalApp from '../../shared/ui/ModalApp.tsx'
import { useEffect, useState } from 'react'
import CreateArticleForm from '../../features/article/ui/CreateArticleForm.tsx'
import checkAuth from '../../features/auth/models/checkAuth.ts'

const ArticlesPage = () => {
	const [modalCreateArticle, setModalCreateArticle] = useState(false)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchAuthStatus = async () => {
			try {
				await checkAuth()
				setIsAuthorized(true)
			} catch (error) {
				console.error(error)
				setIsAuthorized(false)
			} finally {
				setLoading(false)
			}
		}

		fetchAuthStatus().catch()
	}, [])

	const handleOpenModal = () => {
		if (isAuthorized) {
			setModalCreateArticle(true)
		} else {
			alert('You must be logged in')
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<Container>
				<AppBreadcrumbs />
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<TitlePage text={'All Articles'} />
					<Box>
						<Button variant="contained" color="warning" onClick={handleOpenModal}>
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
