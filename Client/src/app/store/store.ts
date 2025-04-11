import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice.ts'
import articlesReducer from '../../entities/article/model/articlesSlice.ts'
import authReducer from '../../features/auth/models/authSlice.ts'
import modalReducer from '../../features/modal/modalSlice.ts'

const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		modal: modalReducer,
		articles: articlesReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false // отключаем проверку сериализуемости (хранение ReactComponent в Redux)
		})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
