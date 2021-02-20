// import fetch from 'isomorphic-unfetch'
import { isEventFinished } from '@/utils/converters'
import { db } from '../../../utils/firebase'
// import { FootballDataMatchResponse } from '../../../utils/types/api-response-types'

const handler = async (req, res) => {
	/*
	1. Go through every user's guesses

		1.1. If guess -> corrected: true, then skip to next guess

	2. Use event date -> check if finished
    Not finished -> skip
		Else, compare result with user guess
				Update user standing (user -> guess -> {leagueSlug} -> points = points + 0/1)
					Set corrected (user -> guess -> {leagueSlug} -> {eventId} -> corrected: true)
	*/
	const users = []
	const guesses = []
	db.ref('users')
		.once('value')
		.then((DataSnapshot) => {
			DataSnapshot.forEach((snap) => {
				snap.child('guess').forEach((leagueGuessSnap) => {
					leagueGuessSnap.forEach((guessSnap) => {
						const team = guessSnap.child('team').val()
						const newObj = {
							userId: snap.key,
							league: leagueGuessSnap.key,
							userGuesses: guessSnap.val(),
						}
						db.ref(`teams/2021/${team}/events/${guessSnap.key}/score/`)
							.once('value')
							.then((data) => {
								console.log(data.val())
								newObj['winner'] = data.val()
								// return data.toJSON()
							})
							.then(() => {
								users.push(newObj)
							})
					})
				})
			})
		})
		.then(() => {
			res.status(200).json(users)
		})
}

export default handler
