import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { Trophy, Training } from '@/components/svg/landing-page'
import { getLeagues } from '@/utils/firebase-requests'
import { UserContext } from '@/utils/user-context'
import { useContext } from 'react'
import { getUserCookie } from '@/utils/auth-cookies'

const Home = ({ user, leagues }: { user: any; leagues: any }) => {
	const { userID } = useContext(UserContext)

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto mb-0">
				{user ? (
					<div className="flex flex-col flex-wrap w-full sm:justify-between sm:flex-row">
						<div className="flex justify-center w-full sm:items-center sm:w-1/2">
							<div className="my-6 space-x-2">
								<Link href="/league/new">
									<a className="btn-blue">Create League</a>
								</Link>
								<Link href="/guess">
									<a className="btn-blue">Start guessing</a>
								</Link>
							</div>
						</div>
						<div className="w-full sm:w-1/3">
							<p className="mb-4 text-2xl font-light text-left text-blue-800">
								Leagues
							</p>
							{leagues &&
								userID &&
								leagues.map((league) => (
									<Leagues
										key={league.slug}
										user={{ id: userID.id, username: userID.username }}
										league={league}
									/>
								))}
						</div>
					</div>
				) : (
					<div className="flex flex-wrap w-full">
						<div className="flex flex-col items-center w-full text-xl font-normal text-center text-blue-600 font-logo md:text-3xl">
							<h1>Guess football results</h1>
							<h1 className="mt-4 mb-6">Compete with your friends</h1>
							<Link href="/signup">
								<a className="text-lg shadow-blue-lg btn-blue">Join</a>
							</Link>
						</div>

						<div className="flex flex-col items-center justify-center w-full mt-6 md:w-1/2">
							<div className="px-2 overflow-hidden text-xl font-light text-blue-700 lowercase bg-white border-2 border-white rounded-lg shadow-lg sm:px-12 neumorph">
								<p className="absolute px-2 py-1 mt-2 -ml-4 text-lg font-semibold text-white bg-blue-500 border-4 border-white rounded-lg shadow-lg">
									how it works
								</p>
								<div className="flex items-center w-full pt-8">
									<div className="w-1/2">
										<p className="">1.&nbsp;Create&nbsp;a&nbsp;league</p>
										<p className="mt-2 ml-4">2.&nbsp;Choose&nbsp;teams</p>
									</div>
									<div className="w-32 transform scale-150 translate-x-10 -translate-y-10 opacity-50">
										<Trophy />
									</div>
								</div>
								<div className="flex items-center">
									<div className="w-32 transform scale-150 -translate-x-10 translate-y-10 opacity-50">
										<Training />
									</div>
									<div className="w-1/2">
										<p className="">3.&nbsp;Invite&nbsp;friends</p>
										<p className="mt-2 ml-4">4.&nbsp;Start&nbsp;guessing!</p>
									</div>
								</div>
							</div>
						</div>
						<div
							className="flex items-end justify-center w-full pt-6 md:w-1/2"
							style={{
								filter: 'drop-shadow(5px 5px 8px rgba(59, 130, 246, 0.3))',
							}}
						>
							<Image src="/footballnotepad-1.png" alt="3d image of football and notepad" width={849} height={635} />
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx) => {
	const { req } = ctx
	// const authCookie = await getAuthCookie(req)
	const user = await getUserCookie(req)
	// console.log(user)
	const leagues = await getLeagues()
	return {
		props: {
			leagues: leagues || null,
			user: user || null,
		},
	}
}

export default Home
