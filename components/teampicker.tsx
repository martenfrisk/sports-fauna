import { Team } from '@/utils/types/api-teams-types'
import Image from 'next/image'
import { useState } from 'react'

const TeamPicker = ({ 
	teams, picker
}: { 
	teams: Team[]; picker: any
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

	const toggleTeam = (id: number, name: string, crestUrl: string) => {
		if (pickedTeam.some((x) => x.id === id)) {
			setPickedTeam(pickedTeam.filter((x) => (x.id !== id)))
		} else {
			setPickedTeam([...pickedTeam, { id, name, crestUrl }])
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
			{Object.values(teams).map((team: Team) => (
				<div
					key={team.id}
					onClick={() => toggleTeam(team.id, team.name, team.crestUrl)}
					className="w-1/2 px-2 cursor-pointer sm:w-1/4"
				>
					<div
						className={`flex items-center flex-col sm:flex-row shadow-sm w-full py-2 px-1 sm:px-4 mx-2 my-2 rounded-md bg-blue-50 ${
							pickedTeam.some((x) => x.id === team.id) && 'bg-gradient-to-b from-blue-200 to-blue-100'
						}`}
					>
						<Image src={team.crestUrl} width={30} height={30} />
						<span className="mt-2 text-sm sm:mt-0 sm:text-base sm:ml-4">{team.shortName}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default TeamPicker
