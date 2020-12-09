import { useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import EditUser from '@/components/edit-user'
import { UserContext } from '@/utils/user-context'
import { getLeagues } from '@/utils/graphql-requests'

const Profile = ({ token, leagues }: {token: any, leagues: any}) => {
	const { userID, setUserID } = useContext(UserContext)
	
	return (
		<Layout>
			<div className="flex flex-col items-center w-full">
				{ userID ? (
					<div className="flex flex-col mt-4">
						<h1 className="mb-4 text-2xl">{userID.admin ? 'Admin' : 'User'} profile</h1>
						<div className="flex flex-wrap justify-between mb-4" key={userID.id}>
							{userID.admin && 
								<p className="w-full">
									<Link href="/admin">
										Go to admin dashboard
									</Link>
								</p>
							}
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
						<div className="mb-4 text-lg">Your leagues</div>
						{leagues && leagues.map((league) => (
							<div key={league.name}>
								<Link href="/league/[slug]" as={`/league/${league.slug}`}>
									{league.name}
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx: any) {
	const token = await getAuthCookie(ctx.req)
	const userID = await getUserCookie(ctx.req)

	const data = await getLeagues(token, userID)
	return {
		props: {
			token: token || null,
			leagues: data?.findUserByID.leagues.data || null
		}
	}
}

export default Profile