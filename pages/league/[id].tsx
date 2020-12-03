// import { useRouter } from 'next/router'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
import TeamPicker from '@/components/teampicker'
import { useEffect, useState } from 'react'
import LeagueOptions from '@/components/league-options'
import LeagueStandings from '@/components/league-standings'

const League = ({ data, teams, token }: { data: any, teams: any, token: any }) => {
	const [pickedTeam, setPickedTeam] = useState(data.options.teams ? data.options.teams : [])
	const [options, setOptions] = useState(data.options ? data.options : {})
	const [upcomingEvents, setUpcomingEvents] = useState(null)

	const getEvents = async (teamId) => {
		const events = await fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamId}`).then((res) => res.json())
		const eventDetails = {
			eventString: events.map((event) => ())
		}
		setUpcomingEvents((prev) => ({...prev, [teamId]: events}))
		console.log(upcomingEvents)
	}

	const [errorMessage, setErrorMessage] = useState('')
	const [updateMessage, setUpdateMessage] = useState('')
	const updateTeam = async () => {
		const query = gql`
      mutation UpdateLeague($id: ID!, $teams: [String], $public: Boolean, $class: LeagueType) {
        updateLeagueOptions(id: $id, data: { teams: $teams, public: $public, class: $class }) {
          teams
					public
					class
        }
      }
    `

		const variables = {
			id: data.options._id,
			teams: pickedTeam,
			public: options.public,
			class: options.class
		}

		try {
			await graphQLClient(token).request(query, variables)
			setTimeout(() => {
				setUpdateMessage('')
			}, 4000)
			setUpdateMessage('Changes saved')
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	useEffect(() => {
		pickedTeam.map((team) => {
			getEvents(team)
			console.log({team})
			// return (
			// 	JSON.stringify(upcomingEvents[team])
			// )
		}
		)
	}, [pickedTeam])

	return (
		<Layout>
			<h1 className="text-2xl text-center">League info</h1>
			<div className="flex w-full">
				<div className="flex flex-wrap w-1/2">
					<div className="w-full">
						Upcoming games for your teams
					</div>
					{upcomingEvents !== null && pickedTeam !== [] && (
						pickedTeam.map((team) => (
							<div className="w-1/2" key={team}>
								<p>
									{upcomingEvents[team]?.events[0].strEvent}
								</p>
								<p>
									{upcomingEvents[team]?.events[1].strEvent}
								</p>
								<p>
									{upcomingEvents[team]?.events[2].strEvent}
								</p>
							</div>
						))
					)}
				</div>
				{data ? (
					<div className="flex flex-col items-start w-1/2">
						<h2>
						League name: {data.name}
						</h2>
						<div>
						League members: 
							{data.members.data.length > 0 ? (
								data.members.data.map((item) => (
									<div key={item.username}>
										{item.username} ({item.email})
									</div>
								))
							) : (
								<span className="ml-2 text-sm italics">
								No members :(
								</span>
							)}
						</div>
						<div className="mt-4">
							<p className="text-sm text-center">
								League options
							</p>
							{data.options ? (
								<LeagueOptions optionsData={[options, setOptions]} />
							) : (
								<div className="ml-2 text-sm italics">
								No options set
								</div>
							)}
						</div>
						<LeagueStandings data={data.standings.data} />

					</div>
				): (
					<div>Loading...</div>
				)}
				<div>

				</div>
			</div>
			<button onClick={() => updateTeam()}>Click to save changes</button>
			{updateMessage && (
				<p>{updateMessage}</p>
			)}
			{errorMessage && (
				<p>{errorMessage}</p>
			)}
			<TeamPicker teams={teams} picker={[pickedTeam, setPickedTeam]} />

		</Layout>
	)
}


export async function getServerSideProps(ctx: any) {
	const { id } = ctx.params
	const token = getAuthCookie(ctx.req)

	const { teams } = await fetch('https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328').then((res) => res.json())

	const query = gql`
		query FindLeague($id: ID!) {
			findLeagueByID(id: $id) {
				name
				_id
				options {
					_id
					class
					public
					teams
					divisions
				}
				standings {
					data {
						_id
						member {
							username
						}
						points
					}
				}
				members {
					data {
						_id
						username
						email
					}
				}
			}
		}`
	const res = await graphQLClient(token).request(query, {id})
	const data = await res

	return { props: { 
		token: token || null,
		data: data?.findLeagueByID,
		teams
	} }
}

export default League