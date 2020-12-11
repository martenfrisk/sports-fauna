import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import { createNewUserGuess, FindLeagueBySlug, FindUserGuessByID, RemoveGuess } from '@/utils/graphql-requests'
import { League, UserGuess, TeamType, Event } from '@/utils/types'
import Layout from '@/components/layout'
import MyGuesses from '@/components/guesses/my-guesses'
import { convertEnum, convertToEnum } from '@/utils/converters'
import { useRouter } from 'next/router'


const Guess = ({league, myGuesses, token, userID}: {league: League, myGuesses: [UserGuess], token: string, userID: string}) => {
	const router = useRouter()

	const [unsaved, setUnsaved] = useState(false)
	const [newWinnerGuess, setNewWinnerGuess] = useState([])
	
	const [guessesFromDb, setGuessesFromDb] = useState([])
	const filterOwn = myGuesses.filter(x => x.user._id === userID)
	useEffect(() => {
		setGuessesFromDb(() => filterOwn)
	}, [])
	const handleInputChange = ({target}, event: any, guessType: string) => {
		const { value } = target
		setUnsaved(true)
		const inputGuess = { 
			eventId: event._id,
			apiEventId: event.eventId,
			homeTeam: event.homeTeamName,
			awayTeam: event.awayTeamName,
			guess: value,
			withEnum: convertToEnum(value),
			type: guessType,
			...event
		}
		if (guessType === 'winner') {
			if (newWinnerGuess.some(x => x.eventId === event._id)) {
				setNewWinnerGuess(() => [...newWinnerGuess.filter(x => x.eventId !== event._id), inputGuess])
			} else {
				setNewWinnerGuess(() => [...newWinnerGuess, inputGuess])
			}
		} 
	}

	const handleRemoveGuess = async (guessId: string) => {
		RemoveGuess(token, guessId)
		const filteredGuess = guessesFromDb.filter(x => x._id !== guessId)
		setGuessesFromDb(() => filteredGuess)
		const { slug } = router.query
		router.push(`/guess/${slug}`)
		// await FindUserGuessByID(token)
		// 	.then((data) => setGuessesFromDb(() => data.allGuesses.data))
	}

	// useEffect(() => {
	// 	setGuessesFromDb(myGuesses)
	// 	console.log('new import')
	// }, [unsaved])

	const handleSave = async () => {
		newWinnerGuess.map(guess => {
			createNewUserGuess(token, userID, guess.eventId, guess.apiEventId, guess.withEnum)
			console.log('guess created')
		})
		setNewWinnerGuess(() => [])
		const { slug } = router.query
		FindUserGuessByID(token)
			.then((data) => setGuessesFromDb(() => data.allGuesses.data))
		router.push(`/guess/${slug}`)
		console.log(guessesFromDb)
		
		setUnsaved(false)
	}

	return (
		<Layout>
			<div className="flex flex-wrap justify-center">
				<div className="mb-4 text-2xl">
					{league.name}
				</div>
				{/* <p className="w-full mb-4 text-center">
					{guessesFromDb.length > 0 ? (
						`You have ${guessesFromDb.length} ${guessesFromDb.length === 1 ? 'guess' : 'guesses'}`
					) : (
						'You have not guessed any games yet.'
					)}
				</p>
				<div className="flex flex-col items-center w-full">
					{guessesFromDb.map((guess: UserGuess) => (
						<div className="flex w-full" key={guess._id}>
							<MyGuesses {...guess} />
						</div>
					))}
				</div> */}
				<div key={league.slug} className="w-full max-w-2xl mt-10">
					
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
												(event: Event) => (
													<div className="p-2 mb-4 rounded-md bg-gray-50" key={event.dateTime}>
														<div className="flex flex-wrap justify-between w-full mb-2">
															<span className="w-full -mb-4 text-sm text-left">
																{new Date(event.dateTime).toLocaleDateString()}
															</span>
															<div className="flex justify-center w-full">
																<span className={`text-base w-1/2 text-right mr-2 ${team.teamName === event.homeTeamName && 'font-semibold'}`}>
																	{event.homeTeamName}
																</span>
																<span className={`text-base w-1/2 ml-2 ${team.teamName === event.awayTeamName && 'font-semibold'}`}>
																	{event.awayTeamName}
																</span>
															</div>
														</div>
														<div className="flex items-center w-full">
															{userID && event.submittedGuesses.data.find((x) => x.user._id === userID) ? (
																<div className="flex justify-between w-full p-1 text-xs bg-green-100 rounded-md">
																	<span className="w-1/5"></span>
																	<div className="flex justify-center w-3/5">
																		<span className="mr-1 text-xs">
																					Your guess:
																		</span>
																		<span className="font-semibold">
																			{convertEnum(event.submittedGuesses.data.find((x) => x.user._id === userID).winner)}
																		</span>
																	</div>
																	<span
																		className="w-1/5 pr-2 text-right cursor-pointer hover:underline font-xs"
																		onClick={() => handleRemoveGuess(event.submittedGuesses.data.find((x) => x.user._id === userID)._id)}
																	>
																		delete
																	</span>
																</div>
															) : (
																<>
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

				{unsaved &&
				<div className="fixed bottom-0 flex flex-col items-center px-10 py-2 bg-white rounded-md bg-opacity-90 ">
							You have {newWinnerGuess.length} unsaved {newWinnerGuess.length === 1 ? 'guess' : 'guesses'}
					<button
						className="px-3 py-1 text-white rounded-md bg-gradient-to-b from-blue-500 to-blue-700"
						onClick={handleSave}
					>
							Save
					</button>
				</div>
				}
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	const userID = getUserCookie(ctx.req)
	const { slug } = ctx.params
	const myGuesses = await FindUserGuessByID(token)

	const data = await FindLeagueBySlug(token, slug)

	return {
		props: {
			token: token || null,
			userID: userID || null,
			league: data?.findLeague.data[0],
			myGuesses: myGuesses?.allGuesses.data || null
		}
	}
}

export default Guess