import { Typography } from '@mui/material'
import { ReactNode } from 'react'

interface ErrorFetchProps {
  error: ReactNode
}

const ErrorFetch = ({ error }: ErrorFetchProps) => {
  return <Typography variant="h6">{error}</Typography>
}
export default ErrorFetch
