import { Box } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { loginValidationSchema } from '../../../schemas/auth.ts'
import { LoginUserInterface } from '../models/types.ts'
import FormikSubmitButton from '../../../shared/ui/form/FormikSubmitButton.tsx'
import FormikTextField from '../../../shared/ui/form/FormikTextField.tsx'
import { useEffect } from 'react'
import { loginUser } from '../models/auth.thunk.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts'
import { closeModal } from '../../modals/modalSlice.ts'
import { showSnackbar } from '../../modals/snackbarSlice.ts'

const LoginUserForm = () => {
	const dispatch = useAppDispatch()
	const { isAuthenticated } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (isAuthenticated) dispatch(closeModal())
	}, [isAuthenticated, dispatch])

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
			await dispatch(loginUser(values)).unwrap()
			dispatch(
				showSnackbar({
					message: 'Login successful',
					severity: 'success'
				})
			)
		} catch (error: unknown) {
			const err = error as LoginErrorInterface
			const { email, password, global } = err

			if (email || password) {
				setErrors({ email, password })
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
	)
}

export default LoginUserForm
