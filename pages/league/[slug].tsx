import Layout from '@/components/layout'
import { getAuthCookie } from '@/utils/auth-cookies'
import TeamPicker from '@/components/teampicker'
import { useEffect, useState } from 'react'
import LeagueOptions from '@/components/league-options'
import LeagueStandings from '@/components/league-standings'
import { FindLeague, getAllTeamTypes, getEventsFromDb, updateTeam } from '@/utils/graphql-requests'
import { League as LeagueType, TeamType } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'

const League = ({ data, teams, token }: { data: LeagueType, teams: [TeamType], token: any }) => {
	const [pickedTeam, setPickedTeam] = useState(
		data.options.teams
	)
	const [options, setOptions] = useState(
		data.options
	)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [upcomingEvents, setUpcomingEvents] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [updateMessage, setUpdateMessage] = useState('')

	const saveChanges = () => {
		updateTeam(token, options, pickedTeam, setUpdateMessage, setErrorMessage)
		setUnsavedChanges(false)
	}

	useEffect(() => {
		if (options !== data.options || pickedTeam !== data.options.teams) {
			setUnsavedChanges(true)
		}
	}, [options, pickedTeam])
	
	useEffect(() => {
		setUpcomingEvents([])
		pickedTeam.map((team) => {
			getEventsFromDb(token, team, setUpcomingEvents)
		}
		)
	}, [pickedTeam])

	return (
		<Layout>
			<h1 className="text-2xl text-center">League info</h1>
			{data && (
				<div className="flex justify-center w-full">
					<Link href={`/guess/${data.slug}`}>
						<a className="btn-blue">
							Start guessing
						</a>
					</Link>
				</div>
			)}
			<div className="flex w-full mt-4 ">
				<div className="flex flex-wrap items-start w-1/2 p-4 mx-4 bg-blue-100 rounded-md">
					<div className="w-full">
						Upcoming games
					</div>
					{upcomingEvents !== [] ? (
						upcomingEvents.map((team) => {
							JSON.stringify(team)
							const mergedGames = [...team.events.homeEvents.data, ...team.events.awayEvents.data]
							mergedGames.sort((a, b) => {
								const varA = a.dateTime.toUpperCase()
								const varB = b.dateTime.toUpperCase()
								if (varA > varB) return 1
								if (varA < varB) return -1
								return 0
							})
							return (
								<div key={team.name} className="flex flex-wrap items-start w-full mt-4">
									<div className="w-1/5 text-lg text-gray-800">
										<Image src={team.events.badge} alt={`${team.name} badge`} height={30} width={30} />
									</div>
									<div className="w-4/5">
										{mergedGames.slice(0, 2).map((event) => (
											<>
												<p>
													<span className={`${event.homeTeamName === team.name && 'font-semibold'} mr-1`}>
														{event.homeTeamName}	
													</span>
													<span className="text-sm">
															vs
													</span>
													<span className={`${event.awayTeamName === team.name && 'font-semibold'} ml-1`}>
														{event.awayTeamName}	
													</span>
												</p>
												<p className="text-xs text-gray-800">{new Date(
													event.dateTime)
													.toLocaleDateString()}</p>
											</>
										))}
									</div>
								</div>
							)
						})
					) : (
						<div>Loading...</div>
					)
					}
				</div>
				{data ? (
					<div className="flex flex-col items-start w-1/2">
						<h2>
						League name: {data.name}
						</h2>
						<div>
						League members: 
							{data.members && data.members.data.length > 0 ? (
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
							<LeagueOptions optionsData={[options, setOptions]} />
						</div>
						{data.standings && (
							<LeagueStandings data={data.standings.data} />
						)}

					</div>
				): (
					<div>Loading...</div>
				)}
				<div>

				</div>
			</div>
			<div className="flex flex-col items-center w-full my-6">
				<button
					onClick={() => saveChanges()}
					className={`px-6 py-2 text-lg border ${unsavedChanges ? 'border-red-600 text-red-600' : 'border-blue-600'} rounded-md`}	
				>
					{unsavedChanges ? 'You have unsaved changes. Click to save.' : 'Save changes'}
				</button>
				{updateMessage && (
					<p className="absolute mt-12 text-sm">{updateMessage}</p>
				)}
			</div>
			{errorMessage && (
				<p>{errorMessage}</p>
			)}
			<div className="flex justify-center w-full">
				<TeamPicker teams={teams} picker={[pickedTeam, setPickedTeam]} />
			</div>

		</Layout>
	)
}


export async function getServerSideProps(ctx: any) {
	const { slug } = ctx.params
	const token = getAuthCookie(ctx.req)
	const teams = await getAllTeamTypes(token)
	const data = await FindLeague(token, slug)

	return { props: { 
		token: token || null,
		data: data?.findLeague.data[0],
		teams: teams?.allTeams.data
	} }
}

export default League