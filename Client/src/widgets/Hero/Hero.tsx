import { Box, Button, Container, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://picsum.photos/1600/900)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <Paper sx={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} py={'12%'}>
            <Grid size={12}>
              <Typography variant="h2" color="white">
                React / Redux Toolkit / TypeScript / Material UI / Axios / Express
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography color="white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit doloribus
                aliquam ad voluptate velit! Necessitatibus non qui inventore quas nostrum? Nam qui
                provident adipisci illum veniam reiciendis cupiditate recusandae. Quas facere fugiat
                inventore. Suscipit inventore veritatis natus sapiente enim, dicta perferendis
                dignissimos quibusdam, voluptatem amet voluptas molestias provident dolor nam
                consectetur.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Button variant="contained" size="large" color="warning">
                Learn more
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  )
}

export default Hero
