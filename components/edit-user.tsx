import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '@/utils/firebase'

const EditUser = ({ defaultValues, id }: { defaultValues: any, id: string }) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [updateMessage, setUpdateMessage] = useState('')

	const { handleSubmit, register, reset, errors } = useForm({
		defaultValues: {
			...defaultValues,
		},
	})

	const onSubmit = handleSubmit(async ({ email, username, favTeam }) => {
		if (errorMessage) setErrorMessage('')
		setUpdateMessage(() => '')
		
		try {
			db.ref(`users/${id}`).update({
				username,
				favTeam
			})
			setUpdateMessage(() => 'Profile updated')
			// setData(() => ({ email, username, favTeam }))
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}) 

	useEffect(() => {
		reset(defaultValues)
	}, [reset, defaultValues])

	return (
		<>
			<form onSubmit={onSubmit} className="w-full">
				<div className="flex items-center justify-between w-full mb-2">
					<label>Email</label>
					<input
						type="text"
						disabled={true}
						name="email"
						className="p-2 ml-2 text-right border-2 border-blue-100 rounded-md shadow-md" 
						ref={register({ required: 'Email is required' })}
					/>
					{errors.email && (
						<span role="alert">
							{errors.email.message}
						</span>
					)}
				</div>
				<div className="flex items-center justify-between w-full mb-2">
					<label>Username</label>
					<input
						type="text"
						name="username"
						className="p-2 ml-2 text-right border-2 border-blue-100 rounded-md shadow-md" 
						ref={register({ required: 'Username is required' })}
					/>
					{errors.username && (
						<span role="alert">
							{errors.username.message}
						</span>
					)}
				</div>

				<div className="flex items-center justify-between w-full mb-2">
					<label>Favorite Team</label>
					<input
						type="text"
						name="favTeam" 
						className="p-2 ml-2 text-right border-2 border-blue-100 rounded-md shadow-md"
						ref={register} 
					/>
					{errors.favTeam && (
						<span role="alert">
							{errors.favTeam.message}
						</span>
					)}
				</div>

				<div className="flex justify-center mt-4">
					<button type="submit" className="px-4 py-2 text-white rounded-md bg-gradient-to-tr from-blue-700 to-blue-400">Update</button>
				</div>
			</form>

			{updateMessage && (
				<p className="py-4 mt-6 text-center bg-opacity-50 rounded-md bg-blue-50">
					{updateMessage}
				</p>
			)}
			{errorMessage && (
				<p role="alert" className="w-64 mx-auto mt-4 text-xs text-center text-red-700">
					An error occurred. That username or email is probably already registered.
				</p>
			)}
		</>
	)
}

export default EditUser