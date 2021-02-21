import { useState } from 'react'
// import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '@/components/layout'
// import FirebaseAuth from '@/components/FirebaseAuth'

const Login = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const { handleSubmit, register, errors } = useForm()
	const { 
		handleSubmit: handleSubmitReset,
		register: registerReset,
		errors: errorsReset } = useForm()

	const onSubmit = handleSubmit(async (formData) => {
		if (errorMessage) setErrorMessage('')
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			
			if (res.ok) {
				setLoading(true)
				router.push('/')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	const onResetSubmit = handleSubmitReset(async (formData) => {
		try {
			const res = await fetch('/api/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			
			if (res.ok) {
				const resText = await res.text()
				setSuccessMessage(resText)
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error(error)
		}
	})

	return (
		<Layout>
			<div className="w-full max-w-6xl px-6 mx-auto">
				<div className="flex justify-center w-full">
					<div className="flex flex-col items-center max-w-2xl">

						<h1 className="mb-6 text-xl">Log in</h1>
						{/* <FirebaseAuth /> */}
						{loading ? (
							<div className="inline-flex items-center">
								<svg className="w-5 h-5 mr-3 -ml-1 text-blue-700 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<p>
									Logging in...
								</p>
							</div>
						): (
							<>
								<form onSubmit={onSubmit}>
									<div className="flex items-end mt-2">
										<label className="w-1/3 mr-2">Email</label>
										<input
											type="email"
											name="email"
											className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
											ref={register({ required: 'Email is required' })}
										/>
										{errors.email && (
											<span role="alert" className="text-red-700">
												{errors.email.message}
											</span>
										)}
									</div>

									<div className="flex items-end mt-2">
										<label className="w-1/3 mr-2">Password</label>
										<input
											type="password"
											autoComplete="current-password"
											name="password"
											className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
											ref={register({ required: 'Password is required' })}
										/>
										{errors.password && (
											<span role="alert" className="text-red-700">
												{errors.password.message}
											</span>
										)}
									</div>

									<div className="flex justify-center w-full mt-4">
										<button type="submit" className="btn-blue">Log in</button>
									</div>
								</form>

								<form onSubmit={onResetSubmit} className="my-10">
									<p className="w-full text-center">Reset password</p>
									<div className="flex items-end mt-2">
										<label className="w-1/3 mr-2">Email</label>
										<input
											type="email"
											name="email"
											className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
											ref={registerReset({ required: 'Email is required' })}
										/>
										{errorsReset.email && (
											<span role="alert" className="text-red-700">
												{errorsReset.email.message}
											</span>
										)}
									</div>
									<div className="flex justify-center w-full mt-4">
										<button type="submit" className="btn-blue">Reset</button>
									</div>
								</form>
							</>
						)}
						{successMessage && (
							<p>{successMessage}</p>
						)}
				
						{errorMessage && (
							<p role="alert" className="text-red-700">
								{errorMessage}
							</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Login