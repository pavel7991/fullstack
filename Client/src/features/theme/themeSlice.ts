import { createSlice } from '@reduxjs/toolkit'

interface initialStateInterface {
  mode: 'dark' | 'light'
}
const initialState: initialStateInterface = {
  mode: 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
