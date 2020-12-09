import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import { getLeagues } from '@/utils/graphql-requests'
import { useContext, useState } from 'react'
import { UserContext } from '@/utils/user-context'
import { useForm } from 'react-hook-form'
import { graphQLClient } from '@/utils/graphql-client'
import { gql } from 'graphql-request'

type TeamType = {
	teamName: string,
	teamId: string,
	badge: string,
	homeEvents: {
		data: [{
			dateTime: string,
			awayTeamName: string,
			_id: string,
			submittedGuesses: {
				data: {
					user: {
						username: string,
						_id: string
					}
						score: string
						winner: string
				}
			}
		}]
	},
	awayEvents: {
		data: [{
			dateTime: string,
			homeTeamName: string,
			_id: string,
			submittedGuesses: {
				data: {
					user: {
						username: string,
						_id: string
					}
						score: string
						winner: string
				}
			}
		}]
	}
}


const Guess = ({leagues, myGuesses }: {leagues: any, myGuesses: any }) => {
	const [unsaved, setUnsaved] = useState(false)
	const [newWinnerGuess, setNewWinnerGuess] = useState([])
	const [newScoreGuess, setNewScoreGuess] = useState([])
	const handleInputChange = (event, guessType: string) => {
		const { value, name } = event.target
		setUnsaved(true)
		const inputGuess = { 
			event: name,
			guess: value,
			type: guessType
		}
		if (guessType === 'winner') {
			if (newWinnerGuess.some(x => x.event === name)) {
				setNewWinnerGuess(() => [...newWinnerGuess.filter(x => x.event !== name), inputGuess])
			} else {
				setNewWinnerGuess(() => [...newWinnerGuess, inputGuess])
			}
		} else {
			if (newScoreGuess.some(x => x.event === name)) {
				setNewScoreGuess(() => [
					newScoreGuess.filter(x => x.event !== name),
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
				{unsaved &&
					<p>You have unsaved guesses</p>
				}
				<div className="flex flex-col items-center w-full">
					{myGuesses.map((guess) => (
						<div className="flex w-full" key={guess._id}>
							<div className="flex items-center justify-center w-1/2">
								<Image src={guess.eventId.homeTeamId.badge} height={30} width={30} />
								<span className="ml-4">
									{guess.eventId.homeTeamName}
								</span>
								<span className="mx-4">vs</span>
								<span className="mr-4">
									{guess.eventId.awayTeamName}
								</span>
								<Image src={guess.eventId.awayTeamId.badge} height={30} width={30} />

							</div>
							<div className="flex items-center w-1/2 space-x-4">
								<span>
									{guess.score && guess.score.join(' - ')}
								</span>
								<span>
									{guess.winner && guess.winner.toLowerCase()}
								</span>
							</div>
						</div>
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
															<>
																<div key={event.dateTime} className="flex justify-between w-full">
																	<span className="ml-2 text-sm">
																		{new Date(event.dateTime).toLocaleDateString()}
																	</span>
																	<span className="text-sm">
																		{event.homeTeamName}
																	</span>
																	<span className="text-xs">
																		&nbsp;vs&nbsp;
																	</span>
																	<span className="text-sm">
																		{event.awayTeamName}
																	</span>
																</div>
																<div className="w-full">
																	{event.submittedGuesses.data.length > 0 && userID ? (
																		<>
																			<div>
																				<input name={event._id} type="radio" value="1" />
																				<input name={event._id} type="radio" value="X" />
																				<input name={event._id} type="radio" value="2" />
																				Current guess:&nbsp;
																				{event.submittedGuesses.data.find((x) => x.user._id === userID.id).winner}
																			</div>
																		</>
																	) : (
																		<div>
																			<input
																				name={event._id}
																				type="radio"
																				value="1"
																				onChange={(e) => handleInputChange(e, 'winner')}
																			/>
																			<input
																				name={event._id}
																				type="radio"
																				value="X"
																				onChange={(e) => handleInputChange(e, 'winner')}
																			/>
																			<input
																				name={event._id}
																				type="radio"
																				value="2"
																				onChange={(e) => handleInputChange(e, 'winner')}
																			/>
																		</div>
																	)}
																</div>
															</>
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
			</div>
		</Layout>
	)
}

export default Guess

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