import { Box } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { loginValidationSchema } from '../../../schemas/auth.ts'
import { LoginUserInterface } from '../models/types.ts'
import FormikSubmitButton from '../../../shared/ui/form/FormikSubmitButton.tsx'
import FormikTextField from '../../../shared/ui/form/FormikTextField.tsx'
import { useState } from 'react'
import AppSnackbar from '../../../shared/ui/AppSnackbar.tsx'
import { loginUser } from '../models/auth.thunk.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store/store.ts'
import { hideModal } from '../../modal/modalSlice.ts'

const LoginUserForm = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' })
	const dispatch = useDispatch<AppDispatch>()

	const initialValues: LoginUserInterface = {
		email: '',
		password: ''
	}

	interface LoginErrorInterface {
		email?: string
		password?: string
		global?: string[]
	}

	const handleSubmit = async (
		values: LoginUserInterface,
		{ setErrors, setSubmitting }: FormikHelpers<LoginUserInterface>
	) => {
		try {
			await dispatch(loginUser(values))
			dispatch(hideModal())
		} catch (error: unknown) {
			const err = error as LoginErrorInterface
			const { email, password, global } = err

			if (email || password) {
				setErrors({ email, password })
			}

			if (Array.isArray(global)) {
				setSnackbar({ open: true, message: global.join(' ') })
			}
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={loginValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Box sx={{ mt: 2 }}>
							<FormikTextField
								name="email"
								type="email"
								label="Email"
								placeholder="Enter your email"
							/>
							<FormikTextField
								name="password"
								type="password"
								label="Password"
								placeholder="Enter your password"
							/>
							<FormikSubmitButton loading={isSubmitting}>
								{isSubmitting ? 'Entering...' : 'Login'}
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

export default LoginUserForm
