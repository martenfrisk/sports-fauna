import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import { getLeagues } from '@/utils/graphql-requests'
import { useContext, useState } from 'react'
import { UserContext } from '@/utils/user-context'
import { graphQLClient } from '@/utils/graphql-client'
import { gql } from 'graphql-request'
import { League, TeamType, UserGuess } from '@/utils/types'
import MyGuesses from '@/components/guesses/my-guesses'

export const convertToEnum = (valueInput: string) => {
	if (valueInput === '1') return 'HOMEWIN'
	if (valueInput === 'X') return 'DRAW'
	if (valueInput === '2') return 'AWAYWIN'
}
export const convertEnum = (enumInput: string) => {
	if (enumInput === 'HOMEWIN') return '1'
	if (enumInput === 'DRAW') return 'X'
	if (enumInput === 'AWAYWIN') return '2'
}
export const convertEnumToTeamName = (enumInput: string, away: string, home: string) => {
	if (enumInput === 'HOMEWIN') return away
	if (enumInput === 'DRAW') return 'Draw'
	if (enumInput === 'AWAYWIN') return home
}

const OldGuess = ({leagues, myGuesses }: {leagues: [League], myGuesses: any }) => {
	const [unsaved, setUnsaved] = useState(false)
	const [newWinnerGuess, setNewWinnerGuess] = useState([])
	const [newScoreGuess, setNewScoreGuess] = useState([])
	const handleInputChange = ({target}, event: any, guessType: string) => {
		const { value } = target
		setUnsaved(true)
		const inputGuess = { 
			eventId: event._id,
			homeTeam: event.homeTeamName,
			awayTeam: event.awayTeamName,
			guess: value,
			withEnum: convertToEnum(value),
			type: guessType
		}
		if (guessType === 'winner') {
			if (newWinnerGuess.some(x => x.eventId === event._id)) {
				setNewWinnerGuess(() => [...newWinnerGuess.filter(x => x.eventId !== event._id), inputGuess])
			} else {
				setNewWinnerGuess(() => [...newWinnerGuess, inputGuess])
			}
		} else {
			if (newScoreGuess.some(x => x.eventId === event._id)) {
				setNewScoreGuess(() => [
					newScoreGuess.filter(x => x.eventId !== event._id),
					inputGuess
				])
			} else {
				setNewScoreGuess(() => [...newScoreGuess, inputGuess])
			}
		}
	}
	const { userID } = useContext(UserContext)

	return (
		<Layout>
			<div className="flex flex-wrap justify-center">
				<p className="w-full text-center">
					{myGuesses.length > 0 ? (
						`You have ${myGuesses.length} ${myGuesses.length === 1 ? 'guess' : 'guesses'}`
					) : (
						'You have not guessed any games yet.'
					)}
				</p>
				<div className="flex flex-col items-center w-full">
					{myGuesses.map((guess: UserGuess) => (
						<MyGuesses {...guess} key={guess._id}/>
					))}
				</div>

				{leagues.length > 0 ? (leagues.map(
					(league: any) => (
						<div key={league.slug} className="w-full max-w-2xl mt-10">
							<div className="mb-4 text-2xl">
								{league.name}
							</div>
							{league.options.teams.map(
								(team: TeamType) => {
									const mergedGames = team.homeEvents !== undefined && [...team.homeEvents.data, ...team.awayEvents.data]
									mergedGames.sort((a, b) => {
										const varA = a.dateTime.toUpperCase()
										const varB = b.dateTime.toUpperCase()
										if (varA > varB) return 1
										if (varA < varB) return -1
										return 0
									})
									return (
										<div key={team.teamId}>
											<div
												className="flex items-start w-full mb-4"
											>
												<div className="flex items-center w-1/3 text-right">
													<Image src={team.badge} height={30} width={30} />
													<span className="ml-4">
														{team.teamName}
													</span>
												</div>
												<div className="w-2/3">
													{mergedGames.map(
														(event: any) => (
															<div className="p-2 mb-4 rounded-md bg-gray-50" key={event.dateTime}>
																<div className="flex justify-between w-full mb-2">
																	<span className="w-1/4 text-sm">
																		{new Date(event.dateTime).toLocaleDateString()}
																	</span>
																	<div className="flex justify-between w-3/4">
																		<span className={`text-base ${team.teamName === event.homeTeamName && 'font-semibold'}`}>
																			{event.homeTeamName}
																		</span>
																		<span className={`text-base ${team.teamName === event.awayTeamName && 'font-semibold'}`}>
																			{event.awayTeamName}
																		</span>
																	</div>
																</div>
																<div className="flex items-center w-full">
																	{userID && event.submittedGuesses.data.find((x) => x.user._id === userID.id) ? (
																		<>
																			<div className="w-1/4 text-sm">
																				<span className="mr-1 text-xs">
																					Your guess
																				</span>
																				<span className="font-semibold">
																					{convertEnum(event.submittedGuesses.data.find((x) => x.user._id === userID.id).winner)}
																				</span>
																			</div>
																			<div className="flex justify-center w-full">
																				<label className="inline-flex items-center">
																					<input
																						name={event._id}
																						type="radio"
																						value="1"
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">1</span>
																				</label>
																				<label className="inline-flex items-center mx-2">
																					<input
																						name={event._id}
																						type="radio"
																						value="X"
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">X</span>
																				</label>
																				<label className="inline-flex items-center">
																					<input
																						name={event._id}
																						type="radio"
																						value="2"
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">2</span>
																				</label>
																			</div>
																		</>
																	) : (
																		<>
																			<div className="w-1/4 text-sm"></div>
																			<div className="flex justify-center w-full">
																				<label className="inline-flex items-center">
																					<input
																						name={event._id}
																						type="radio"
																						value="1"
																						className="border-gray-500 border-px"
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">1</span>
																				</label>
																				<label className="inline-flex items-center mx-2">
																					<input
																						name={event._id}
																						type="radio"
																						value="X"
																						className="bg-blue-100 "
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">X</span>
																				</label>
																				<label className="inline-flex items-center">
																					<input
																						name={event._id}
																						type="radio"
																						value="2"
																						className=""
																						onChange={(e) => handleInputChange(e, event, 'winner')}
																					/>
																					<span className="ml-2">2</span>
																				</label>
																			</div>
																		</>
																	)}
																</div>
															</div>
														)
													)}
												</div>
											</div>
										</div>
									)
								})}
						</div>
					)
				)
				) : (
					<div className="flex flex-col items-center">
						<p className="my-6">You must join or create a league to start guessing.</p>
						<Link href="/">
							<a className="btn-blue">
							Back
							</a>
						</Link>
					</div>
				)}

				{unsaved &&
					<div className="fixed bottom-0 flex flex-col items-center px-10 py-2 bg-white rounded-md bg-opacity-90 ">
						{/* <div className="relative self-end -mt-1">
							<button onClick={() => setUnsaved(false)} className="mb-2 -mr-6 text-lg">x</button>
						</div> */}
						<div className="flex items-center">
							<p className="w-1/2 mb-2 -mt-2 text-base">
								You have unsaved guesses
							</p>
							{newWinnerGuess.length > 0 && (
								<div className="flex flex-col w-1/2 ml-2 text-sm">
									{newWinnerGuess.map((guess) => (
										<p key={guess.eventId}>
											{guess.homeTeam} vs {guess.awayTeam}: {guess.guess}
										</p>
									))}
								</div>
							)}
						</div>
						<button className="px-3 py-1 text-white rounded-md bg-gradient-to-b from-blue-500 to-blue-700">Save</button>
					</div>
				}
			</div>
		</Layout>
	)
}

export default OldGuess

export const getServerSideProps = async (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	const query = gql`
		query FindGuess($user: ID!)
		{
			findGuessByUserId(user: $user) {
				data {
					winner
					score
					_id
					apiEventId
					eventId {
						awayTeamName
						homeTeamName
						homeTeamId {
							badge
						}
						awayTeamId {
							badge
						}
					}
				}
			}
		}`
	let myGuesses
	
	const userID = getUserCookie(ctx.req)
	if (token && userID) myGuesses = await graphQLClient(token).request(query, { user: userID })
	const data = await getLeagues(token, userID)
	return {
		props: {
			leagues: data?.findUserByID.leagues.data,
			myGuesses: myGuesses?.findGuessByUserId.data
		}
	}
}