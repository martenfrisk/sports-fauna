import Link from 'next/link'
import Layout from '@/components/layout'
import { db } from '@/utils/firebase'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import EditUser from '@/components/edit-user'
import { getLeagues } from '@/utils/firebase-requests'
import { getUserDetails } from '@/utils/serverside-requests'
import { useState } from 'react'
// import type { DecodedIdToken } from 'firebase-admin'
import admin from 'firebase-admin'

const Profile = ({
	userData,
	userID,
	leagues,
	firebaseUserDetails,
}: {
	userData
	userID: any
	leagues: any
	firebaseUserDetails: admin.auth.DecodedIdToken
}) => {
	const [msg, setMsg] = useState('')
	const sendVerificationEmail = async () => {
		await fetch('/api/email-verification', {
			method: 'POST',
		})
			.then((res) => res.text())
			.then((data) => setMsg(data))
	}
	return (
		<Layout>
			<div className="flex flex-col items-center w-full">
				<div className="flex flex-col items-center w-full">
					{userData ? (
						<div className="flex flex-col mt-4">
							<h1 className="mb-4 text-2xl">
								{userData.admin ? 'Admin' : 'User'} profile
							</h1>
							<div
								className="flex flex-wrap justify-between mb-4"
								key={userData.id}
							>
								{userData.admin && (
									<p className="w-full">
										<Link href="/admin">Go to admin dashboard</Link>
									</p>
								)}
							</div>

							<EditUser defaultValues={userData} id={userID.split('|')[0]} />
							{firebaseUserDetails && (
								<div className="flex justify-center w-full my-8">
									{msg === '' ? (
										firebaseUserDetails.email_verified ? (
											<p>Your account is verified.</p>
										) : (
											<p>
												Your account is not verified. Click{' '}
												<button type="submit" onClick={sendVerificationEmail}>
													here
												</button>{' '}
												to send a verification link to your email.
											</p>
										)
									) : (
										<p>{msg}</p>
									)}
								</div>
							)}
							{leagues && (
								<div>
									<div className="flex flex-col items-center my-4">
										<div className="my-4 text-xl font-light text-blue-700">
											Your leagues
										</div>
										{/* {leagues.map((league: League) => (
									<div className="flex flex-wrap justify-between max-w-sm px-6 py-4 mb-4 bg-white rounded-md shadow-blue-lg" key={league._id}>
										<div >
											<Link href={`/league/${league.slug}`}>
												<a className="text-lg font-light text-blue-800 border-b-2 border-white border-dashed hover:border-blue-400">
													{league.name}

												</a>
											</Link>
										</div>
										<div className="flex flex-col w-full p-2 ">
											{league.members && league.members.data.length > 0 ? (
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
								))} */}
									</div>
								</div>
							)}
						</div>
					) : (
						<div>
							<p>You need to be logged in to view your profile.</p>
							<Link href="/login">
								<a className="border-b border-blue-700 border-dashed">
									Go to login page.
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: any) => {
	const token = await getAuthCookie(ctx.req)
	const userID = await getUserCookie(ctx.req)
	let userData, firebaseUserDetails
	if (userID) {
		userData = await db
			.ref(`users/${userID.split('|')[0]}`)
			.get()
			.then((data) => data.toJSON())
		firebaseUserDetails = await getUserDetails(token)
	}
	const data = await getLeagues()
	return {
		props: {
			userID: userID || null,
			leagues: data || null,
			userData: userData || null,
			firebaseUserDetails: firebaseUserDetails || null,
		},
	}
}

export default Profile
