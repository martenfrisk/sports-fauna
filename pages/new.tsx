import { useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'
import { graphQLClient } from '../utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'

const New = ({token}: {token: any}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const { handleSubmit, register, errors } = useForm()
	const { data: user } = useSWR('/api/user')

	const onSubmit = handleSubmit(async ({ name }) => {
		if (errorMessage) setErrorMessage('')

		const mutation = gql`
      mutation NewLeague($name: String!, $id: [ID]) {
        createLeague(
					data: { 
						name: $name,
						members: { 
							connect: $id
						} 
					}
				) {
					name
					members {
						data {
							username
						}
					}
				}
      }
		`
		
		const variables = {
			name,
			members: user && user.id,
		}

		try {
			await graphQLClient(token).request(mutation, variables)
			Router.push('/')
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	return (
		<Layout>
			<h1 className="text-3xl">Create new todo</h1>
			<div className="flex flex-col items-center w-full">

				<form onSubmit={onSubmit}>
					<div  className="flex flex-col">
						<label>League name</label>
						<input
							type="text"
							name="name"
							className="px-4 py-2 text-gray-700 border border-blue-400 rounded-md"
							placeholder="Your League name"
							ref={register({ required: 'League name is required' })}
						/>
						{errors.name && (
							<span role="alert">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="mt-2">
						<button type="submit" className="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-tr from-blue-800 to-blue-400">Create</button>
					</div>
				</form>

				{errorMessage && (
					<p role="alert">
						{errorMessage}
					</p>
				)}
			</div>
		</Layout>
	)
}


export const getServerSideProps = (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	return { props: { token: token || null } }
}


export default New
