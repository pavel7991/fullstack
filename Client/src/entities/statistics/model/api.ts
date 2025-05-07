import api from '../../../shared/api/axios.ts'
import { Stats } from './types.ts'

export const getStats = () => api.get<Stats>('/articles/stats')
