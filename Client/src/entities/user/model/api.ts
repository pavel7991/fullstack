import api from '../../../shared/api/axios.ts'
import { User } from './types.ts'
import { Article } from '../../article/model/types.ts'

export const getAllUser = () => api.get<User[]>('/users')

export const getUserDetails = (id: string) =>
	api.get<{ user: User; articles: Article[] }>(`/users/${id}`)
