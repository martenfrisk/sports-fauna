import Image from 'next/image'
import { convertEnumToTeamName } from '@/utils/converters'
import { UserGuess } from '@/utils/types'

const MyGuesses = (guess: UserGuess, key: string) => (
	<div className="flex w-full" key={key}>
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
									Winner:&nbsp;
				{guess.winner && convertEnumToTeamName(guess.winner, guess.eventId.awayTeamName, guess.eventId.homeTeamName)}
			</span>
		</div>
	</div>
)

export default MyGuesses