import { Event, UserGuess } from '@/utils/types'

const FinishedEvents = ({
	resultForThis,
	updateStandings,
	setStandingsUpdated,
	standingsUpdated,
	event,
}: {
  event: Event
  resultForThis
  updateStandings
  standingsUpdated
  setStandingsUpdated
  
}) => {
	function standingsFunction(updateStandings: any, guess: UserGuess, correctWinner: string, setStandingsUpdated: any, standingsUpdated: any) {
		updateStandings(
			guess.league._id,
			guess.user._id,
			correctWinner === guess.winner ? 3 : 0,
			guess._id
		)
		setStandingsUpdated(() => [
			...standingsUpdated,
			{
				_id: guess._id,
			},
		])
	}
	return (
		<div key={event._id} className="flex justify-between">
			<div>
				{event.homeTeamId.teamName} vs {event.awayTeamId.teamName}
			</div>
			<div>{new Date(event.dateTime).toDateString()}</div>
			{resultForThis && (
				<>

					<div className="ml-4">
						{event.submittedGuesses.data.map((guess: UserGuess) => {
							let correctWinner: string
							if (
								resultForThis.data[0].home.score >
                resultForThis.data[0].away.score
							)
								correctWinner = 'HOMEWIN'
							if (
								resultForThis.data[0].home.score <
                resultForThis.data[0].away.score
							)
								correctWinner = 'AWAYWIN'
							if (
								resultForThis.data[0].home.score ===
                resultForThis.data[0].away.score
							)
								correctWinner = 'DRAW'
							console.log({
								guess,
							})
							return (
								<div key={guess._id}>
									{guess.corrected ? (
										<span className="mr-2 text-xs bg-green-100">
                      Already corrected
										</span>
									) : (
										<button
											className="mr-2"
											onClick={() => {
												standingsFunction(updateStandings, guess, correctWinner, setStandingsUpdated, standingsUpdated)
											}}
										>
											{standingsUpdated.some((x) => x._id === guess._id) ? (
												<span className="line-through">Inserted</span>
											) : (
												'Update standings'
											)}
										</button>
									)}
									{guess.user.username} - {guess.winner}
								</div>
							)
						})}
					</div>
					<div>
            Result: {resultForThis.data[0].home.score} -{' '}
						{resultForThis.data[0].away.score}
					</div>
				</>
			)}
		</div>
	)
}

export default FinishedEvents


