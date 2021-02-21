import Layout from '@/components/layout'
import { getUserCookie } from '@/utils/auth-cookies'
import { getLeaguesByUser } from '@/utils/firebase-requests'
import { NextPageContext } from 'next'
import Link from 'next/link'

const Guess = ({ data }: { data: string[] }) => {
	return (
		<Layout>
			<div className="flex flex-col items-center">
				<p className="text-lg text-center">
					Choose a league and start guessing!
				</p>
				{data &&
					data.map((league: string) => (
						<div key={league} className="my-8">
							<Link href={`/guess/${league}`}>
								<a className="p-4 border border-blue-400 rounded-md shadow-md hover:bg-white bg-blue-50">
									{league}
								</a>
							</Link>
						</div>
					))}
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const userID = getUserCookie(ctx.req)
	// console.log(userID.split('|')[0])

	const data = await getLeaguesByUser(userID.split('|')[0])
	// console.log(data)

	return {
		props: {
			data: data || null,
		},
	}
}

export default Guess
