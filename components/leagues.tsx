import Link from 'next/link'
import { UserContext } from '@/utils/user-context'
import { useContext, useEffect, useState } from 'react'
import { leaveLeague, joinLeague, getNewLeagueData } from '@/utils/graphql-requests'
import { League, User } from '@/utils/types'

const Leagues = ({ token }: { token: any }) => {
	const { userID } = useContext(UserContext)
	const [leagueInfo, setLeagueInfo] = useState([])

	const getData = async () => {
		const data = await getNewLeagueData(token)
		data && setLeagueInfo(() => data.allLeagues.data)
	}

	
	const toggleMembership = async (action: string, leagueId: string) => {
		if (action === 'join') {
			await joinLeague(token, userID.id, leagueId)
				.then(() => getData())
		} else if (action === 'leave') {
			await leaveLeague(token, userID.id, leagueId)
				.then(() => getData())
		}
	}
	useEffect(() => {
		getData()
	}, [])
	

	return userID
		? leagueInfo.length > 0 && (
			<div className="flex flex-col items-center">
				<p className="mb-4 text-2xl font-light text-center text-blue-800">Leagues</p>
				{leagueInfo.map((league: League) => (
					<div className="flex flex-wrap justify-between max-w-sm px-6 py-4 mb-4 bg-white rounded-md shadow-blue-lg" key={league._id}>
						<div >
							<Link href={`/league/${league.slug}`}>
								<a className="text-lg font-light text-blue-800 border-b-2 border-white border-dashed hover:border-blue-400">
									{league.name}

								</a>
							</Link>
						</div>
						{league.members.data.some(
							(member) => member._id === userID.id
						) ? (
								<button
									onClick={() => toggleMembership('leave', league._id)}
									className="px-2 py-px text-blue-700 transition-all duration-500 bg-white border-2 border-blue-300 rounded-md bg-gradient-to-br from-white to-blue-100 shadow-blue-lg via-white hover:to-blue-200"
								>
                  Leave
								</button>
							) : (
								<button
									onClick={() => toggleMembership('join', league._id)}
									className="px-2 py-px text-blue-700 transition-all duration-500 bg-white border-2 border-blue-300 rounded-md bg-gradient-to-br from-white to-blue-100 shadow-blue-lg via-white hover:to-blue-200"
								>
                  Join
								</button>
							)}
						<div className="flex flex-col w-full p-2 ">
							{league.members.data.length > 0 ? (
								<>
									{league.members.data.map((member: User) => (
										<span className="text-base font-light" key={member._id}>
											{member.username}
										</span>
									))}
								</>
							) : (
								<p className="text-sm">No members</p>
							)}
						</div>
					</div>
				))}
			</div>
		)
		: null
}

export default Leagues
