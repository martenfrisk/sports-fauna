import { useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import EditUser from '@/components/edit-user'
import { UserContext } from '@/utils/user-context'
import { getLeagues } from '@/utils/graphql-requests'
import { League, User } from '@/utils/types'

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
						</div>
						<EditUser defaultValues={userID} setData={setUserID} id={userID.id} token={token} />
					</div>
				) : (
					<div>Loading...</div>
				)}
				{ leagues && (
					<div>
						<div className="flex flex-col items-center my-4">
							<div className="my-4 text-xl font-light text-blue-700">Your leagues</div>
							{leagues.map((league: League) => (
								<div className="flex flex-wrap justify-between max-w-sm px-6 py-4 mb-4 bg-white rounded-md shadow-blue-lg" key={league._id}>
									<div >
										<Link href={`/league/${league.slug}`}>
											<a className="text-lg font-light text-blue-800 border-b-2 border-white border-dashed hover:border-blue-400">
												{league.name}

											</a>
										</Link>
									</div>
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