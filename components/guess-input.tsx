import { updateUserGuess } from '@/utils/firebase-requests'
import { Match } from '@/utils/types/api-response-types'
import { useState, useEffect } from 'react'

const GuessInput = ({
	match,
	prevInput,
	mainTeam,
	league,
	userId,
}: {
	match: Match
	prevInput?: {
		event: string
		guess: string
	}
	mainTeam: any
	league: string
	userId: string
}) => {
	const [guess, setGuess] = useState(prevInput ? prevInput.guess : '')
	const [unsaved, setUnsaved] = useState(false)
	useEffect(() => {
		guess !== '' && guess !== prevInput?.guess && setUnsaved(true)
	}, [guess])
	const saveGuess = () => {
		if (guess !== '') {
			updateUserGuess(userId, match.id, league, guess)
			setUnsaved(false)
		}
	}
	return (
		<div
			className="p-2 mb-4 bg-opacity-25 rounded-md shadow-md bg-blue-50"
			key={Number(match.utcDate)}
		>
			<div className="flex flex-wrap justify-between w-full mb-2">
				<div className="flex justify-between w-full text-sm">
					<span>
						{new Date(match.utcDate).toLocaleDateString('sv-SE')}
					</span>
					<span>{match.competition.name}</span>
				</div>
				<div className="flex justify-center w-full">
					<span
						className={`text-base w-1/2 text-right mr-2 ${
							mainTeam === match.homeTeam.id && 'font-semibold'
						}`}
					>
						{match.homeTeam.name}
					</span>
					<span
						className={`text-base flex justify-between w-1/2 ml-2 ${
							mainTeam === match.awayTeam.id && 'font-semibold'
						}`}
					>
						<span>{match.awayTeam.name}</span>
					</span>
				</div>
			</div>
			<div className="flex items-center w-full justify-evenly">
				<label>
					1
					<input
						type="radio"
						className="ml-2 transform translate-y-px"
						name={match.id.toString()}
						checked={guess === '1'}
						onChange={() => setGuess('1')}
						id=""
					/>
				</label>
				<label>
					X
					<input
						type="radio"
						className="ml-2 transform translate-y-px"
						name={match.id.toString()}
						checked={guess === 'X'}
						onChange={() => setGuess('X')}
						id=""
					/>
				</label>
				<label>
					2
					<input
						type="radio"
						className="ml-2 transform translate-y-px"
						name={match.id.toString()}
						checked={guess === '2'}
						onChange={() => setGuess('2')}
						id=""
					/>
				</label>
			</div>
			{unsaved && (
				<div className="flex justify-center w-full">
					<button type="submit" onClick={saveGuess}>
						Save
					</button>
				</div>
			)}
		</div>
	)
}

export default GuessInput
