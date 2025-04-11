import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../features/theme/themeSlice.ts'
import articlesReducer from '../../entities/article/model/articlesSlice.ts'
import authReducer from '../../features/auth/models/authSlice.ts'
import modalReducer from '../../features/modals/modalSlice.ts'

const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		modal: modalReducer,
		articles: articlesReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
