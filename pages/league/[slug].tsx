import Layout from '@/components/layout'
import TeamPicker from '@/components/teampicker'
import EventItem from '@/components/event'
import { useEffect, useState } from 'react'
import LeagueOptions from '@/components/league-options'
import LeagueStandings from '@/components/league-standings'
import {
	FindLeague,
	getAllTeams,
	getEventsFromDb,
	updateLeagueOptions,
} from '@/utils/firebase-requests'
import Image from 'next/image'
import Link from 'next/link'

const SavePopup = ({
	saveChanges,
	unsavedChanges,
	updateMessage,
}: {
	saveChanges: any
	unsavedChanges: boolean
	updateMessage: any
}) => {
	return (
		<div className="flex flex-col items-center w-full my-6">
			<button
				onClick={() => saveChanges()}
				className={`px-6 py-2 text-lg border ${
					unsavedChanges ? 'border-red-600 text-red-600' : 'border-blue-600'
				} rounded-md`}
			>
				{unsavedChanges
					? 'You have unsaved changes. Click to save.'
					: 'Save changes'}
			</button>
			{updateMessage && (
				<p className="absolute mt-12 text-sm">{updateMessage}</p>
			)}
		</div>
	)
}

const League = ({ data, teams }: { data: any; teams: any }) => {
	const [pickedTeam, setPickedTeam] = useState<any>(Object.values(data.teams))
	const [isPublic, setIsPublic] = useState<boolean>(data.public)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [upcomingEvents, setUpcomingEvents] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [updateMessage, setUpdateMessage] = useState('')
	const saveChanges = () => {
		updateLeagueOptions(
			data.slug,
			isPublic,
			pickedTeam,
			setUpdateMessage,
			setErrorMessage
		)
		setUnsavedChanges(false)
	}

	useEffect(() => {
		if (
			isPublic !== data.public ||
			pickedTeam.length !== Object.values(data.teams).length
		) {
			setUnsavedChanges(true)
			setUpdateMessage('')
		}
	}, [isPublic, pickedTeam])

	useEffect(() => {
		setUpcomingEvents([])
		pickedTeam.map(async (team: any) => {
			const events = await getEventsFromDb('2021', team.id)
			if (events) {
				setUpcomingEvents((prev) => [
					...prev,
					{ team: team.name, crestUrl: team.crestUrl, events: events },
				])
			}
		})
	}, [pickedTeam])

	return (
		<Layout>
			<h1 className="text-2xl text-center">League info</h1>
			{data && (
				<div className="flex justify-center w-full">
					<Link href={`/guess/${data.slug}`}>
						<a className="btn-blue">Start guessing</a>
					</Link>
				</div>
			)}
			<div className="flex flex-wrap w-full mt-4">
				<div className="flex flex-wrap items-start order-2 w-full p-4 bg-blue-100 rounded-md sm:order-1 sm:w-1/2">
					<div className="w-full mb-2">Upcoming games</div>
					{upcomingEvents !== [] ? (
						upcomingEvents.map((event) => (
							<div className="w-full mb-4" key={event.team}>
								<p className="flex items-center w-full mb-2">
									{event.crestUrl && (
										<Image src={event.crestUrl} width={30} height={30} />
									)}
									<span className="ml-4 text-lg">{event.team}</span>
								</p>
								<EventItem event={event.events} team={event.team} />
							</div>
							// <pre>{JSON.stringify(event, null, 2)}</pre>
						))
					) : (
						<div>Loading...</div>
					)}
				</div>
				{data ? (
					<div className="flex flex-col items-center order-1 w-full p-4 mb-4 sm:items-start sm:order-2 sm:w-1/2">
						<div className="flex justify-between w-full px-4 py-2 mb-2 bg-white rounded-md shadow-md">
							<div className="w-1/2">League name:</div>
							<div className="w-1/2 text-left">{data.name}</div>
						</div>
						<div className="flex justify-between w-full px-4 py-2 bg-white rounded-md shadow-md">
							<div className="w-1/2">Members:</div>
							<div className="flex flex-col w-1/2">
								{data.members ? (
									Object.values(data.members).map((user: any) => (
										<span key={user.username}>{user.username}</span>
									))
								) : (
									<span className="ml-2 text-sm italics">No members :(</span>
								)}
							</div>
						</div>
						<LeagueStandings data={data.members} />
						<div className="w-1/2 px-4 py-2 mt-4 bg-white rounded-md shadow-md">
							<p className="text-sm text-left">League options</p>
							<LeagueOptions optionsData={[isPublic, setIsPublic]} />
						</div>
					</div>
				) : (
					<div>Loading...</div>
				)}
				<div></div>
			</div>

			<SavePopup
				saveChanges={saveChanges}
				unsavedChanges={unsavedChanges}
				updateMessage={updateMessage}
			/>

			{errorMessage && <p>{errorMessage}</p>}
			<div className="flex justify-center w-full">
				<TeamPicker teams={teams} picker={[pickedTeam, setPickedTeam]} />
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx: any) {
	const { slug } = ctx.params
	const teams = await getAllTeams('2021')
	const data = await FindLeague(slug)
	return {
		props: {
			data: data || null,
			teams: teams || null,
		},
	}
}

export default League
