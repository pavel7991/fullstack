import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice.ts'
import articlesReducer from '../../entities/article/model/articlesSlice.ts'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
