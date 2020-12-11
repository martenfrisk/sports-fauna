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
			await joinLeague(token, userID.id, leagueId).then(() => getData())
		} else if (action === 'leave') {
			await leaveLeague(token, userID.id, leagueId).then(() => getData())
		}
	}
	useEffect(() => {
		getData()
	}, [])

	return userID
		? leagueInfo.length > 0 && (
			<div>
				<p className="text-lg">Leagues</p>
				{leagueInfo.map((league: League) => (
					<div className="flex flex-wrap justify-between mb-4" key={league._id}>
						<div className="w-1/2">
							<Link href={`/league/${league.slug}`}>
								{league.name}
							</Link>
						</div>
						{league.members.data.some(
							(member) => member._id === userID.id
						) ? (
								<button
									onClick={() => toggleMembership('leave', league._id)}
								>
                  Leave
								</button>
							) : (
								<button onClick={() => toggleMembership('join', league._id)}>
                  Join
								</button>
							)}
						<div className="flex flex-col w-full p-2 border border-gray-400 rounded-md">
							{league.members.data.length > 0 ? (
								<>
									<p>
									League members
									</p>
									{league.members.data.map((member: User) => (
										<span className="text-sm" key={member._id}>
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
