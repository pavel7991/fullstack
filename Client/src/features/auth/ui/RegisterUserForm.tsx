import { Box } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { registerValidationSchema } from '../../../schemas/auth.ts'
import {
	ErrorRegisterInterface,
	RegisterUserInterface
} from '../models/types.ts'
import FormikSubmitButton from '../../../shared/ui/form/FormikSubmitButton.tsx'
import FormikTextField from '../../../shared/ui/form/FormikTextField.tsx'
import { useAppDispatch } from '../../../app/store/hooks.ts'
import { closeModal } from '../../modals/modalSlice.ts'
import { registerUser } from '../models/auth.thunk.ts'
import { showSnackbar } from '../../modals/snackbarSlice.ts'

const RegisterUserForm = () => {
	const dispatch = useAppDispatch()

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
			await dispatch(registerUser(values)).unwrap()
			dispatch(closeModal())
			dispatch(
				showSnackbar({
					message: 'Registration successful',
					severity: 'success'
				})
			)
		} catch (error: unknown) {
			const err = error as ErrorRegisterInterface
			const { username, email, password, confirmPassword, global } = err

			if (username || email || password || confirmPassword) {
				setErrors({ username, email, password, confirmPassword })
			}
			if (Array.isArray(global)) {
				dispatch(
					showSnackbar({
						message: global.join(' '),
						severity: 'error'
					})
				)
			}
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={registerValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Box sx={{ mt: 2 }}>
						<FormikTextField
							name="username"
							label="Username"
							placeholder="Enter your username"
						/>

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
	)
}

export default RegisterUserForm
