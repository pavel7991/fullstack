import { Box } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { registerValidationSchema } from '../../../schemas/auth.ts'
import { RegisterUserInterface } from '../models/types.ts'
import FormikSubmitButton from '../../../shared/ui/form/FormikSubmitButton.tsx'
import FormikTextField from '../../../shared/ui/form/FormikTextField.tsx'
import registerUser from '../models/registerUser.ts'
import { useState } from 'react'
import AppSnackbar from '../../../shared/ui/AppSnackbar.tsx'

const RegisterUserForm = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' })

	const initialValues: RegisterUserInterface = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	const handleSubmit = async (
		values: RegisterUserInterface,
		{ setErrors, setSubmitting }: FormikHelpers<RegisterUserInterface>
	) => {
		try {
			await registerUser(values)
		} catch (err: any) {
			setErrors(err)

			if ('global' in err) {
				setSnackbar({ open: true, message: err.global })
			}
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<Box sx={{ mt: 2 }}>
							<FormikTextField name="username" label="Username" placeholder="Enter your username" />

							<FormikTextField name="email" type="email" label="Email" placeholder="Enter your email" />

							<FormikTextField name="password" type="password" label="Password" placeholder="Enter your password" />

							<FormikTextField
								name="confirmPassword"
								type="password"
								label="Confirm Password"
								placeholder="Confirm your password"
							/>

							<FormikSubmitButton loading={isSubmitting}>
								{isSubmitting ? 'Registering...' : 'Sing Up'}
							</FormikSubmitButton>
						</Box>
					</Form>
				)}
			</Formik>

			<AppSnackbar
				open={snackbar.open}
				message={snackbar.message}
				onClose={() => setSnackbar({ open: false, message: '' })}
			/>
		</>
	)
}

export default RegisterUserForm
