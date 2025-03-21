import { createTheme } from '@mui/material'
import { PaletteMode } from '@mui/material'

export const getAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode
    }
  })
}
