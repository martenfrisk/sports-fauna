import { useContext, useState } from 'react'
import Router from 'next/router'
import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import Layout from '../../components/layout'
import { graphQLClient } from '../../utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
import { UserContext } from '@/utils/user-context'
import LeagueOptions from '@/components/league-options'
import TeamPicker from '@/components/teampicker'
import { getAllTeamTypes } from '@/utils/graphql-requests'

const New = ({token, teams}: {token: any, teams: any, teamsWithId: any}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [pickedTeams, setPickedTeams] = useState([])
	const [options, setOptions] = useState({
		name: '',
		class: 'SINGLEDIVISION',
		public: true
	})
	const { handleSubmit, errors } = useForm()
	const { userID } = useContext(UserContext)

	const onSubmit = handleSubmit(async () => {
		if (errorMessage) setErrorMessage('')
		const filterTeams = pickedTeams.map((x) => x._id)
		const slug = slugify(options.name, { lower: true })
		const mutation = gql`
      mutation NewLeague(
				$name: String!, 
				$slug: String!,
				$members: [ID], 
				$standingsMembers: ID, 
				$class: LeagueType, 
				$public: Boolean, 
				$teams: [ID], 
			) {
        createLeague(
					data: { 
						name: $name
						slug: $slug
						members: { 
							connect: $members,
						} 
						options: { 
							create: {
								class: $class,
								public: $public,
								teams: $teams
							}
						}
						standings: {
              create: {
                member: {
                  connect: $standingsMembers
                }
                points: 0
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
			slug,
			members: userID && userID.id,
			standingsMembers: userID && userID.id,
			class: options.class,
			public: options.public,
			teams: filterTeams,
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
				<form>
					<div className="flex flex-col items-center">
						<label className="mb-2">League name</label>
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
				</form>
				<p className="my-2">Options</p>
				<LeagueOptions optionsData={[options, setOptions]} />

				<button
					type="submit"
					className="mb-4 btn-blue"
					onClick={onSubmit}
				>
						Create
				</button>
				<TeamPicker picker={[pickedTeams, setPickedTeams]} teams={teams} />
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


export const getServerSideProps = async (ctx: any) => {
	const token = getAuthCookie(ctx.req)

	const teams = await getAllTeamTypes(token)
	return { props: { 
		token: token || null,
		teams: teams?.allTeams.data
	} }
}


export default New
