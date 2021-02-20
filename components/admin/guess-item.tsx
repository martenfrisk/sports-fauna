import { convertWinner } from '@/utils/extra-functions'
import { db } from '@/utils/firebase'
import { useState } from 'react'

interface GuessOptionsType {
	corrected: boolean
	eventDate: string
	eventId: number
	guess: string
	team: number
}

const GuessItem = ({
	guessOptions,
	eventId,
	leagueId,
	userId,
	event,
}: {
	guessOptions: GuessOptionsType
	eventId
	leagueId
	userId
	event
}) => {
	const [msg, setMsg] = useState('')
	const updateStandings = async () => {
		try {
			if (guessOptions.guess == convertWinner(event.score.winner)) {
				const points = await db
					.ref(`leagues/${leagueId}/members/${userId}/points`)
					.get()
					.then((Snap) => {
						console.log(Snap.val())
						return Snap.val()
					})

				if (points !== null) {
					await db.ref(`leagues/${leagueId}/members/${userId}`).update({
						points: points + 1,
					})
				} else {
					await db.ref(`leagues/${leagueId}/members/${userId}`).update({
						points: 1,
					})
				}
			}
			await db
				.ref(`users/${userId}/guess/${leagueId}/${eventId}`)
				.update({ corrected: true })
		} catch (error) {
			setMsg(error)
		} finally {
			setMsg('Guess updated')
		}
	}
	return (
		<div>
			<p>corrected: {guessOptions.corrected.toString()}</p>
			<p>eventDate: {guessOptions.eventDate}</p>
			<p>guess: {guessOptions.guess}</p>
			<p>
				winner: {convertWinner(event.score.winner)} ({event.score.winner})
			</p>
			{event.score.winner && (
				<p>
					correct guess:{' '}
					{guessOptions.guess == convertWinner(event.score.winner)
						? 'true'
						: 'false'}
				</p>
			)}
			{msg === '' ? (
				<button type="button" onClick={updateStandings}>
					Update standings
				</button>
			) : (
				<p>{msg}</p>
			)}
		</div>
	)
}

export default GuessItem
