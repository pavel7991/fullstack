import HideImageIcon from '@mui/icons-material/HideImage'
import { Box } from '@mui/material'

const NoImgBg = () => {
  return (
    <Box
      width="100%"
      display="flex"
      height="240px"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#ccc' }}
    >
      <HideImageIcon fontSize="large" />
    </Box>
  )
}
export default NoImgBg
