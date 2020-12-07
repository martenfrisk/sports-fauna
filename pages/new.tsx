import { useContext, useState } from 'react'
import Router from 'next/router'
import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'
import { graphQLClient } from '../utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
import { UserContext } from '@/utils/user-context'
import LeagueOptions from '@/components/league-options'

const New = ({token}: {token: any}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [options, setOptions] = useState({
		name: '',
		class: '',
		public: true
	})
	const { handleSubmit, register, errors } = useForm()
	const { userID } = useContext(UserContext)

	const onSubmit = handleSubmit(async ({ name }) => {
		if (errorMessage) setErrorMessage('')

		const mutation = gql`
      mutation NewLeague($name: String!, $id: [ID], $class: LeagueType, $public: Boolean) {
        createLeague(
					data: { 
						name: $name
						members: { 
							connect: $id,
						} 
						options: { 
							create: {
								class: $class,
								public: $public
							}
						}
					}
				) {
					name
				}
      }
		`
		
		const variables = {
			name: options.name,
			members: userID && userID.id,
			class: options.class,
			public: options.public,
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
			<h1 className="text-3xl">Create new league</h1>
			<div className="flex flex-col items-center w-full">
				<form onSubmit={onSubmit}>
					<div className="flex flex-col items-center">
						<label>League name</label>
						<input
							type="text"
							name="name"
							className="px-4 py-2 text-gray-700 border border-blue-400 rounded-md"
							placeholder="Your League name"
							value={options.name}
							onChange={(e) => setOptions({...options, name: e.target.value})}
						/>
						{errors.name && (
							<span role="alert" className="text-xs text-red-800">
								{errors.name.message}
							</span>
						)}

					</div>
					<input type="submit" className="px-4 py-2 mt-4 text-sm text-white rounded-md bg-gradient-to-tr from-blue-800 to-blue-400" />
				</form>
				<LeagueOptions optionsData={[options, setOptions]} />
				{JSON.stringify(options)}

				{errorMessage && (
					<p role="alert" className="w-1/2 mt-8 text-xs text-center text-red-800">
						{/* {errorMessage.split(':')[0]} */}
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
