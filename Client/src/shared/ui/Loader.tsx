import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={20}>
      <CircularProgress />
    </Box>
  )
}
export default Loader
