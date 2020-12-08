import Image from 'next/image'
import { useState } from 'react'

const TeamPicker = ({ 
	teams, picker
}: { 
	teams: any; picker: any
 }) => {
	const [selectAll, setSelectAll] = useState(false)
	const [pickedTeam, setPickedTeam] = picker

	const toggleSelectAll = () => {
		if (!selectAll) {
			setPickedTeam(teams)
			setSelectAll(true)
		} else {
			setPickedTeam([])
			setSelectAll(false)
		}
	}

	const toggleTeam = (teamId: string, teamName: string, _id: any) => {
		if (pickedTeam.some((x) => x.teamId === teamId)) {
			setPickedTeam(pickedTeam.filter((x) => (x.teamId !== teamId)))
		} else {
			setPickedTeam([...pickedTeam, { _id, teamId, teamName }])
		}
	}

	return (
		<div className="flex flex-wrap justify-between max-w-4xl text-sm">
			<div  className="flex flex-col items-center w-full mb-2 text-lg">
				<div>Choose teams to include</div>
				<button 
					onClick={() => toggleSelectAll()}
					className="btn-blue"
				>
					{selectAll ? 'Select none' : 'Select all'}
				</button>
			</div>
			{teams.map((team) => (
				<div
					key={team.teamId}
					onClick={() => toggleTeam(team.teamId, team.teamName, team._id)}
					className="w-1/4 px-2 cursor-pointer"
				>
					<div
						className={`flex items-center shadow-sm w-full py-2 px-4 mx-2 my-2 rounded-md bg-blue-50 ${
							pickedTeam.some((x) => x.teamId === team.teamId) && 'bg-gradient-to-b from-blue-200 to-blue-100'
						}`}
					>
						<Image src={team.badge} width={30} height={30} />
						<span className="ml-4 text-base">{team.teamName}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default TeamPicker
