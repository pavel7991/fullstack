import { TextField, TextFieldProps } from '@mui/material'

const Input = (props: TextFieldProps) => {
  return <TextField variant="outlined" size="small" margin="normal" fullWidth {...props} />
}
export default Input
