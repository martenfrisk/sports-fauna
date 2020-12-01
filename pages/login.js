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
			<h1>Log in</h1>

			<form onSubmit={onSubmit}>
				<div>
					<label>Email</label>
					<input
						type="email"
						name="email"
						ref={register({ required: 'Email is required' })}
					/>
					{errors.email && (
						<span role="alert" className="text-red-700">
							{errors.email.message}
						</span>
					)}
				</div>

				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						ref={register({ required: 'Password is required' })}
					/>
					{errors.password && (
						<span role="alert" className="text-red-700">
							{errors.password.message}
						</span>
					)}
				</div>

				<div>
					<button type="submit">Log in</button>
				</div>
			</form>

			{errorMessage && (
				<p role="alert" className="text-red-700">
					{errorMessage}
				</p>
			)}
		</Layout>
	)
}

export default Login