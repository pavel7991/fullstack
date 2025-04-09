import { useState } from 'react'
import api from '../../../shared/api/axios.ts'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store/store.ts'
import { addArticle } from '../../../entities/article/model/articlesSlice.ts'
import { ArticleCreateRequest } from '../../../entities/article/model/types.ts'

export const useCreateArticle = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const createArticle = async ({ title, content, img }: ArticleCreateRequest) => {
		setIsLoading(true)
		setError('')

		try {
			const response = await api.post('/articles', {
				title,
				content,
				img
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
