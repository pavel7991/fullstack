import { AppBar, Container, Typography, Button, Box } from '@mui/material'
import SwitchTheme from '../../shared/ui/SwitchThemeButton.tsx'
import Navbar from './Navbar.tsx'

const Header = () => {
  return (
    <AppBar position="sticky" color="inherit" sx={{ py: 1 }}>
      <Container>
        <Box sx={{ px: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="textSecondary">
            My App
          </Typography>

          <Navbar />

          <SwitchTheme />
          <Button variant="outlined" color="inherit" size="small">
            Login
          </Button>
          <Button variant="contained" color="warning" size="small" sx={{ ml: 2 }}>
            Sing up
          </Button>
        </Box>
      </Container>
    </AppBar>
  )
}
export default Header
