import { Button, ButtonProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode
  loading?: boolean
}

const FormikSubmitButton: FC<SubmitButtonProps> = ({ children, loading = false, ...props }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="warning"
      disabled={loading}
      fullWidth
      sx={{
        mt: 3,
        mb: 2,
        py: 1.5,
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 500
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default FormikSubmitButton
