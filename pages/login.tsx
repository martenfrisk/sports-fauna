import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '@/components/layout'

const Login = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState('')
	const { handleSubmit, register, errors } = useForm()

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
				router.push('/')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	return (
		<Layout>
			<div className="flex justify-center w-full">
				<div className="flex flex-col items-center max-w-2xl">

			
					<h1 className="mb-6 text-xl">Log in</h1>

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

					{errorMessage && (
						<p role="alert" className="text-red-700">
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default Login