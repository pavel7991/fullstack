import { Typography } from '@mui/material'

type TitlePageProps = {
  text: string
}

const TitlePage = ({ text }: TitlePageProps) => {
  return (
    <Typography variant="h4" sx={{ my: 5, mb: 3 }}>
      {text}
    </Typography>
  )
}
export default TitlePage
