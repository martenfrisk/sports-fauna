import Image from 'next/image'

const TeamPicker = ({ teams, picker }: { teams: any; picker: any }) => {
	const [pickedTeam, setPickedTeam] = picker

	const toggleTeam = (teamId: string) => {
		if (pickedTeam.some((x) => x === teamId)) {
			setPickedTeam(pickedTeam.filter((x) => (x !== teamId)))
		} else {
			setPickedTeam([...pickedTeam, teamId])
		}
	}

	return (
		<div className="flex flex-wrap justify-between max-w-6xl text-sm">
			{teams.map((team) => (
				<div
					key={team.idTeam}
					onClick={() => toggleTeam(team.idTeam)}
					className="w-1/4 px-2 cursor-pointer"
				>
					<div
						className={`flex items-center w-full p-4 mx-2 my-2 rounded-md bg-blue-50 ${
							pickedTeam.some((x) => x === team.idTeam) && 'bg-blue-200'
						}`}
					>
						<Image src={team.strTeamBadge} width={30} height={30} />
						<span className="ml-4 text-lg">{team.strTeam}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default TeamPicker
