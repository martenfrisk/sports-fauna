import Link from 'next/link'
import { UserContext } from '@/utils/user-context'
import { useContext, useState } from 'react'
import { leaveLeague, joinLeague } from '@/utils/graphql-requests'

const Leagues = ({ token, leagueData }: { token: any; leagueData: any }) => {
	const { userID } = useContext(UserContext)
	const [leagueInfo, setLeagueInfo] = useState(leagueData)

	const toggleMembership = (action: string, leagueId: string) => {
		if (action === 'join') {
			joinLeague(token, userID.id, leagueId, setLeagueInfo)
		} else if (action === 'leave') {
			leaveLeague(token, userID.id, leagueId, setLeagueInfo)
		}
	}

	return userID
		? leagueInfo.data.length > 0 && (
			<div>
				<p className="text-lg">Leagues</p>
				{leagueInfo.data.map((league) => (
					<div className="flex flex-wrap justify-between mb-4" key={league._id}>
						<div className="w-1/2">
							<Link href={`/league/${league._id}`}>
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
									{league.members.data.map((member) => (
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
