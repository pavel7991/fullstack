import { configureStore } from '@reduxjs/toolkit'
import { articlesReducer } from './articles'
import themeReducer from './theme/themeSlice.tsx'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    articles: articlesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
