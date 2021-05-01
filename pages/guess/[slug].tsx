import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import {
	FindLeague,
	FindUserGuessByID,
	getEventsFromDb,
} from '@/utils/firebase-requests'
import Layout from '@/components/layout'
import { Match } from '@/utils/types/api-response-types'
import GuessInput from '@/components/guess-input'
import {
	withAuthUser,
	useAuthUser,
	AuthAction,
	withAuthUserTokenSSR,
} from 'next-firebase-auth'

const Guess = ({
	league,
	myGuesses,
	userID,
}: {
	league: any
	myGuesses: any
	userID: string
}) => {
	const [myEvents, setMyEvents] = useState([])
	useEffect(() => {
		setMyEvents([])
		Object.values(league.teams).forEach(async (team: any) => {
			const eventsByTeam = await getEventsFromDb('2021', team.id)
			if (eventsByTeam) {
				setMyEvents((prev) => [
					...prev,
					{
						team: team.name,
						teamId: team.id,
						crestUrl: team.crestUrl,
						events: eventsByTeam,
					},
				])
			}
		})
	}, [])

	// Disable this check during beta period to allow guessing finished games 
	// const checkIfFinished = (eventDate: Date) =>
	// 	new Date(eventDate).getTime() < new Date().getTime() ? true : false
	

	return (
		<Layout>
			<div>
				<div className="flex flex-wrap justify-center rounded-lg bg-blue-50">
					<div className="w-full my-4 text-2xl text-center">{league.name}</div>
					<div className="flex flex-col">
						{myEvents &&
							myEvents.map((eventItem: any) => (
								<div
									key={eventItem.team}
									className="flex flex-wrap items-start w-full mb-4 "
								>
									<div className="flex flex-wrap items-center mb-6 text-right wm-full sm:w-1/3 sm:mb-2">
										<Image src={eventItem.crestUrl} height={30} width={30} />
										<span className="ml-4">{eventItem.team}</span>
									</div>
									<div className="w-full">
										{eventItem.events.map(
											(event: Match) =>
												
												<GuessInput
													key={event.id}
													userId={userID}
													league={league.name}
													mainTeam={eventItem.teamId}
													match={event}
													prevInput={myGuesses.find((guess) => guess.event == event.id)}
												/>
										)}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, params }) => {
	// const token = getAuthCookie(ctx.req)
	const userID = await AuthUser.id
	const { slug } = params
	const myGuesses = await FindUserGuessByID(userID, slug.toString())

	const data: any = await FindLeague(slug.toString())

	return {
		props: {
			userID: userID || null,
			league: data || null,
			myGuesses: myGuesses || null,
		},
	}
})
//@ts-ignore
export default withAuthUser()(Guess)


