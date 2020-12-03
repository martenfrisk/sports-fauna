import { graphQLClient } from '@/utils/graphql-client'
import Link from 'next/link'
import { UserContext } from '@/utils/user-context'
import { gql } from 'graphql-request'
import { useContext, useState } from 'react'

const Leagues = ({ token, leagueData }: { token: any, leagueData: any }) => {
	const { userID } = useContext(UserContext)
	const [leagueInfo, setLeagueInfo] = useState(leagueData)
	
	async function getNewLeagueData() {
		const query = gql`
			{
				allLeagues {
					data {
						_id
						name
						members {
							data {
								_id
								username
							}
						}
						}
					}
			}`
		
		await graphQLClient(token).request(query).then((res) => setLeagueInfo(res.allLeagues))
	}
	

	const joinLeague = async (userID, leagueID) => {
		const mutation = gql`
      mutation JoinLeague($userID: [ID], $leagueID: ID!) {
        partialUpdateLeague(id: $leagueID, data: { members: { connect: $userID } } ) {
          name
        }
      }
    `

		const variables = {
			userID,
			leagueID
		}

		try {
			await graphQLClient(token)
				.setHeader('X-Schema-Preview', 'partial-update-mutation')
				.request(mutation, variables)
			getNewLeagueData()
			// mutate()
		} catch (error) {
			console.error(error)
		}
	}
	const leaveLeague = async (userID, leagueID, leagueName) => {
		const mutation = gql`
      mutation LeaveLeague($userID: [ID], $leagueID: ID!, $leagueName: String!) {
        partialUpdateLeague(id: $leagueID, data: { name: $leagueName, members: { disconnect: $userID } } ) {
          name
        }
      }
    `

		const variables = {
			userID,
			leagueID,
			leagueName
		}

		try {
			await graphQLClient(token)
				.setHeader('X-Schema-Preview', 'partial-update-mutation')
				.request(mutation, variables)
			getNewLeagueData()
			// mutate()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		leagueInfo && (
			<div>
				<p>Leagues</p>
				{leagueInfo.data.map((league) => (
					<div className="flex" key={league._id}>
						<div>
							<Link href="/league/[id]" as={`/league/${league._id}`}>
								{league.name}
							</Link>
						</div>
						{league.members.data.some((member) => member._id === userID.id) ? (
							<button onClick={() => leaveLeague(userID.id, league._id, league.name)}>Leave</button>
						) : (
							<button onClick={() => joinLeague(userID.id, league._id)}>Join</button>
						)}
						{league.members.data.length > 0 && (
							<div className="ml-2">
									-
								{league.members.data.map((member) => (
									<span className="ml-2" key={member._id}>
										{member.username}
									</span>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		)
	)
}

export default Leagues