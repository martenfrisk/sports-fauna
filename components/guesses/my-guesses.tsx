import Image from 'next/image'
import { convertEnumToTeamName } from '@/utils/converters'
import { UserGuess } from '@/utils/types/types'

const MyGuesses = (guess: UserGuess) => (
	<div className="flex w-full mb-3">
		<div className="flex items-center justify-start w-1/2">
			<Image src={guess.eventId.homeTeamId.badge} height={25} width={25} />
			<span className="ml-4">
				{guess.eventId.homeTeamName}
			</span>
			<span className="mx-4">vs</span>
			<span className="mr-4">
				{guess.eventId.awayTeamName}
			</span>
			<Image src={guess.eventId.awayTeamId.badge} height={25} width={25} />

		</div>
		<div className="flex items-center w-1/2 space-x-4">
			<span>
				{guess.winner === 'DRAW' ? (
					'Draw'
				): (
					<span>
						{guess.winner && (
							convertEnumToTeamName(guess.winner, guess.eventId.awayTeamName, guess.eventId.homeTeamName)
						)}
						&nbsp;to win
					</span>
				)}
			</span>
			{/* <span onClick={() => handleRemove(guess._id)}>Delete</span> */}
		</div>
	</div>
)

export default MyGuesses