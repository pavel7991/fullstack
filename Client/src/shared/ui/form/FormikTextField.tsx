import { TextField, TextFieldProps } from '@mui/material'
import { Field, useField } from 'formik'
import { FC } from 'react'

interface FormikTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  label: string
  type?: string
  placeholder?: string
}

const FormikTextField: FC<FormikTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <Field
      as={TextField}
      variant="outlined"
      margin="normal"
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
    />
  )
}

export default FormikTextField
