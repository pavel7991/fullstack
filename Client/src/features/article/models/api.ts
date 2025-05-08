import api from '../../../shared/api/axios.ts'
import {
	Article,
	ArticleUpdateRequest
} from '../../../entities/article/model/types.ts'

export const updateArticleRequest = async (
	id: string,
	data: ArticleUpdateRequest
): Promise<{ article: Article; message: string }> => {
	const response = await api.put(`/articles/${id}`, data, {
		withCredentials: true
	})
	return response.data
}
