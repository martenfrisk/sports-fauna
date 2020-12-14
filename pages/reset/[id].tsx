import { NextPageContext } from 'next'
import { query as q } from 'faunadb'
import { guestClient } from '@/utils/fauna-client'
import Layout from '@/components/layout'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Reset = ({ email, userRef, resetRef }: { email: string, userRef: string, resetRef: string }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [userEmail, setUserEmail] = useState(email)
	const [errorMessage, setErrorMessage] = useState('')
	const { handleSubmit, register, errors } = useForm()
	const router = useRouter()

	const onSubmit = handleSubmit(async (formData) => {
		if (errorMessage) setErrorMessage('')
		const body = {
			password: formData.password,
			user: userRef,
			reset: resetRef
		}

		try {
			const res = await fetch('/api/new-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
			
			if (res.ok) {
				router.push('/login')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	return (
		!userRef ? (
			<Layout>
				<p>Error. Please contact the site admin.</p>
			</Layout>
		) : (
			<Layout>
				<h1>Reset password</h1>
				<form onSubmit={onSubmit}>
					<div className="flex items-end mt-2">
						<label className="w-1/3 mr-2">Email</label>
						<input
							type="email"
							name="email"
							className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
							value={userEmail}
							disabled
						/>
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
						<button type="submit" className="btn-blue">
							Change password
						</button>
					</div>
				</form>
				<div>{errorMessage}</div>
			</Layout>
		)
	)
}


export const getServerSideProps = async (ctx: NextPageContext) => {
	const { id } = ctx.query
	type ResetType = {
		ref: {
			id: string
		}
		data: {
			email: string
			token: string
		}
	}
	const reset: ResetType = await guestClient.query(
		q.Get(q.Match(q.Index('find_reset_by_token'), id))
	)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {ref} = await guestClient.query(
		q.Get(q.Match(q.Index('unique_User_email'), q.Casefold(reset.data.email)))
	)
	const userRef = await ref.id
	// const user = userRef.split(',')[1].split('"')[1]

	console.log(ref)
	return {
		props: {
			email: reset.data.email || null,
			userRef: userRef,
			resetRef: reset?.ref.id
		}
	}

}
export default Reset