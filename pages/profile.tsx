import { useState, useContext, useEffect } from 'react'
import { gql } from 'graphql-request'
// import useSWR from 'swr'
import Layout from '@/components/layout'
import { getAuthCookie } from '@/utils/auth-cookies'
import { graphQLClient } from '@/utils/graphql-client'
import EditUser from '@/components/edit-user'
import { UserContext } from '@/utils/user-context'

const Profile = ({ token }: {token: any}) => {
	const { userID, setUserID } = useContext(UserContext)
	const [leagues, setLeagues] = useState(null)
	async function getLeagues() {
		const query = gql`
			query FindUser($id: ID!) {
				findUserByID(id: $id) {
					username
					leagues {
						data {
							name
						}
					}
				}
			}`
		
		// const variables = {
		// 	id: userID && userID.id
		// }
		userID !== undefined && await graphQLClient(token).request(query, { id: userID.id })
			.then((res) => {
				setLeagues(() => res.findUserByID)
				console.log(res)
			})
			.catch((error) => console.error(error))
	}

	useEffect(() => {
		userID && userID.id !== undefined && getLeagues()
	}, [userID])

	return (
		<Layout>
			<div className="flex flex-col items-center w-full">
				<h1 className="mb-4 text-2xl">User profile</h1>
				{ userID ? (
					<div className="flex flex-col mt-4">
						<div className="flex flex-wrap justify-between mb-4" key={userID.id}>
							<p className="w-1/2">Username:</p>
							<p className="w-1/2">{userID.username}</p>
							<p className="w-1/2">Email:</p>
							<p className="w-1/2">{userID.email}</p>
							{userID.favTeam && (
								<>
									<p className="w-1/2">Team:</p>
									<p className="w-1/2">{userID.favTeam}</p>
								</>
							)} 
						</div>
						<EditUser defaultValues={userID} setData={setUserID} id={userID.id} token={token} />
					</div>
				) : (
					<div>Loading...</div>
				)}
				{ leagues && (
					<div>
						Your leagues
						{leagues.leagues.data && leagues.leagues.data.map((league) => (
							<div key={league.name}>{league.name}</div>
						))}
					</div>
				)}
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx: any) {
	const token = await getAuthCookie(ctx.req)
	return { 
		props: { 
			token: token || null,
		}
	}
}

export default Profile