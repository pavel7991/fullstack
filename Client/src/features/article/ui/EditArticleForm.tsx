import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts'
import { ChangeEvent, useState, FormEvent } from 'react'
import Input from '../../../shared/ui/form/Input.tsx'
import { Box, Button } from '@mui/material'
import { Article } from '../../../entities/article/model/types.ts'
import { updateArticleById } from '../../../entities/article/model/articles.thunks.ts'
import { showSnackbar } from '../../modals/snackbarSlice.ts'
import { closeModal } from '../../modals/modalSlice.ts'

const EditArticleForm = () => {
	const dispatch = useAppDispatch()
	const article = useAppSelector((state) => state.articles.selectedArticle)
	const { loading, error } = useAppSelector((state) => state.articles)

	const [title, setTitle] = useState<string>((article as Article)?.title || '')
	const [content, setContent] = useState<string>(
		(article as Article)?.content || ''
	)
	const [img, setImg] = useState<string | undefined>(
		(article as Article)?.img || ''
	)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!article?._id) return

		try {
			await dispatch(
				updateArticleById({
					id: article._id,
					data: {
						title,
						content,
						img
					}
				})
			).unwrap()

			dispatch(
				showSnackbar({
					message: 'Updated',
					severity: 'success'
				})
			)
			dispatch(closeModal())
		} catch (error) {
			console.error('Error updating article:', error)
		}
	}

	if (error) {
		dispatch(showSnackbar({ message: error, severity: 'error' }))
	}
	return (
		<Box component="form" onSubmit={handleSubmit}>
			<Input
				label="Name"
				value={title}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setTitle(e.target.value)
				}
				required
			/>

			<Input
				label="URL img"
				value={img}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setImg(e.target.value)}
			/>
			<Input
				label="Content"
				value={content}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setContent(e.target.value)
				}
				multiline
				minRows={6}
				required
			/>

			<Button
				type="submit"
				variant="contained"
				color="warning"
				sx={{ mt: 2 }}
				fullWidth
			>
				{loading ? 'Editing...' : 'Edit article'}
			</Button>
		</Box>
	)
}
export default EditArticleForm
