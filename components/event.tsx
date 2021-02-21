import { Match } from '@/utils/types/api-response-types'

const EventItem = ({ event, team }: {event: Match[], team: any }) => (
	<div>
		{event.slice(0, 3).map((singleEvent) => (
			<div className="flex items-center justify-between w-full mb-2" key={singleEvent.id}>
				<p>
					<span
						className={`${
							singleEvent.homeTeam.name === team && 'font-semibold'
						} mr-1`}
					>
						{singleEvent.homeTeam.name}
					</span>
					<span className="text-sm">vs</span>
					<span
						className={`${
							singleEvent.awayTeam.name === team && 'font-semibold'
						} ml-1`}
					>
						{singleEvent.awayTeam.name}
					</span>
				</p>
				<p className="text-xs text-gray-800">
					{new Date(singleEvent.utcDate).toLocaleDateString('sv-SE')}
				</p>
			</div>
		))}
	</div>
)



export default EventItem