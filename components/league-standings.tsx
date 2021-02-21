const LeagueStandings = ({ data }: { data: any}) => {
	const users = []
	Object.values(data).map((user: any) => (users.push(user)))
	// console.log(users)
	
	const sorted = users.sort((a, b) => {
		if(a.points > b.points) return -1
		if(a.points < b.points) return 1
	})
	return (
		<div className="w-1/2 px-4 py-2 mt-4 rounded-lg bg-gray-50">
			<p className="text-sm text-left">
				Standings
			</p>
			{sorted.map((position, index) => (
				<div key={position.username} className="flex items-center">
					<span className="w-4 mr-2 text-sm">{index + 1}</span>
					<span className="w-1/2 mr-6">
						{position.username}
					</span>
					<span className="mr-2 text-sm">
						{position.points ? position.points : '0'}p
					</span>
				</div>
			))}
		</div>
	)
}

export default LeagueStandings