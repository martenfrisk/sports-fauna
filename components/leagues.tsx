import Link from 'next/link'
// import { UserContext } from '@/utils/user-context'
import { useEffect, useState } from 'react'
import { leaveLeague, joinLeague } from '@/utils/firebase-requests'
// import { League, User } from '@/utils/types'
import { db } from '@/utils/firebase'

const Leagues = ({
	user,
	league,
}: {
	user: { id: string; username: string }
	league: any
}) => {
	const [leagueInfo, setLeagueInfo] = useState(null)
	const [isMember, setIsMember] = useState<boolean>(null)
	const getLeagueData = async () => {
		db.ref(`/leagues/${league.slug}`).on('value', (snapshot) => {
			setLeagueInfo(() => snapshot.val())
		})
		// return teams
		// console.log(teams)
		// if (teams) setLeagueInfo(() => teams)
	}
	useEffect(() => {
		getLeagueData()
	}, [])
	useEffect(() => {
		if (leagueInfo && leagueInfo.members) {
			const checkIfMember = Object.keys(leagueInfo.members).some(
				(member: any) => member === user.id
			)
			setIsMember(!!checkIfMember)
		} else {
			setIsMember(false)
		}
	}, [leagueInfo])

	const toggleMembership = async (
		action: string,
		leagueName: string,
		leagueId: string
	) => {
		if (action === 'join') {
			await joinLeague(
				{ id: leagueId, name: leagueName },
				{ id: user.id, name: user.username }
			)
		} else if (action === 'leave') {
			await leaveLeague(
				{ id: leagueId, name: leagueName },
				{ id: user.id, name: user.username }
			)
			// .then(() => getData())
		}
	}
	// useEffect(() => {
	// 	setLeagueInfo(league)
	// }, [])

	return leagueInfo ? (
		<div
			className="flex flex-wrap justify-between w-full px-6 py-4 mb-4 bg-white rounded-md shadow-blue-lg"
			key={leagueInfo.name}
		>
			<div>
				<Link href={`/league/${leagueInfo.slug}`}>
					<a className="text-lg font-light text-blue-800 border-b-2 border-white border-dashed hover:border-blue-400">
						{leagueInfo.name}
					</a>
				</Link>
			</div>
			{isMember ? (
				<button
					onClick={() =>
						toggleMembership('leave', leagueInfo.name, leagueInfo.id)
					}
					className="px-2 py-px text-blue-700 transition-all duration-500 bg-white border-2 border-blue-300 rounded-md bg-gradient-to-br from-white to-blue-100 shadow-blue-lg via-white hover:to-blue-200"
				>
					Leave
				</button>
			) : (
				<button
					onClick={() =>
						toggleMembership('join', leagueInfo.name, leagueInfo.id)
					}
					className="px-2 py-px text-blue-700 transition-all duration-500 bg-white border-2 border-blue-300 rounded-md bg-gradient-to-br from-white to-blue-100 shadow-blue-lg via-white hover:to-blue-200"
				>
					Join
				</button>
			)}
			<div className="flex flex-col w-full p-2 ">
				{leagueInfo.members ? (
					<>
						{Object.values(leagueInfo.members).map((member: any) => (
							<span className="text-base font-light" key={member.username}>
								{member.username}
							</span>
						))}
					</>
				) : (
					<p className="text-sm">No members</p>
				)}
			</div>
		</div>
	) : null
}

export default Leagues
