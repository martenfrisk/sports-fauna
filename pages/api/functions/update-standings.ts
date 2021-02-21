import { db } from  '@/utils/firebase'
import { convertWinner } from '@/utils/extra-functions'


const handler = async (req, res) => {
	const { userId, leagueSlug, teamId, eventId } = await req.body
	/*
	1. Go through every user's guesses
    
		1.1. If guess -> corrected: true, then skip to next guess

  2.1 If not finished -> skip
    2.2.1. If fetched, compare result with user guess
      2.2.1.1. Update user standing (user -> guess -> {leagueSlug} -> points = points + 0/1)
        2.2.1.2. Set corrected (user -> guess -> {leagueSlug} -> {eventId} -> corrected: true)
	*/
	const leagueRef = db.ref(`users/${userId}/guess/${leagueSlug}`)
	db.ref(`teams/2021/${teamId}/events/${eventId}/score/winner`)
		.once('value')
		.then((DataSnapshot) => {
			console.log(DataSnapshot.val())
			const win = convertWinner(DataSnapshot.val())
			console.log({ win })

			// winner = DataSnapshot.val()
			db.ref(`users/${userId}/guess/${leagueSlug}/${eventId}/guess`)
				.once('value')
				.then((data) => {
					const userGuess = data.toJSON()
					console.log(`users/${userId}/guess/${leagueSlug}/${eventId}/guess`)
					if (userGuess == win) {
						leagueRef
							.child('points')
							.get()
							.then((data) => {
								console.log(data.toJSON())

								db.ref(
									`users/${userId}/guess/${leagueSlug}/${eventId}/corrected`
								).set(true)
								if (data.exists()) {
									leagueRef.update({
										points: parseInt(data.val()) + 1,
									})
								} else {
									leagueRef.update({
										points: 1,
									})
								}
							})
					}
				})
		})
		.then(() => {
			res.status(200).send('Updated')
		})
		.catch((err) => {
			res.status(404).json(err)
		})
}

export default handler
