import { Standings } from '@/utils/types'

const LeagueStandings = ({ data }: { data: Standings[]}) => {
	const sorted = data.sort((a, b) => {
		if(a.points > b.points) return -1
		if(a.points < b.points) return 1
	})
	return (
		<div className="w-40 p-2 mt-4 rounded-lg bg-gray-50">
			<p className="text-sm text-center">
				Standings
			</p>
			{sorted.map((position, index) => (
				<div key={position._id} className="flex items-center">
					<span className="w-4 mr-2 text-sm">{index + 1}</span>
					<span className="w-1/2 mr-6">
						{position.member.username}
					</span>
					<span className="mr-2 text-sm">
						{position.points}p
					</span>
				</div>
			))}
		</div>
	)
}

export default LeagueStandings