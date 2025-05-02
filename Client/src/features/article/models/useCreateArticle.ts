import { useState } from 'react'
import api from '../../../shared/api/axios.ts'
import axios from 'axios'
import { addArticle } from '../../../entities/article/model/articlesSlice.ts'
import { ArticleCreateRequest } from '../../../entities/article/model/types.ts'
import { useAppDispatch } from '../../../app/store/hooks.ts'

export const useCreateArticle = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const createArticle = async ({
		title,
		content,
		img,
		userID
	}: ArticleCreateRequest) => {
		setIsLoading(true)
		setError('')

		try {
			const response = await api.post('/articles', {
				title,
				content,
				img,
				userID
			})

			const createdArticle = response.data
			dispatch(addArticle(createdArticle))

			return createdArticle
		} catch (err: unknown) {
			if (err instanceof axios.AxiosError) {
				setError(err.message || 'Error creating article')
			} else {
				setError('An unknown error occurred')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { createArticle, isLoading, error }
}
