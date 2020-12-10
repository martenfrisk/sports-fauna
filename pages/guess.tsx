import Layout from '@/components/layout'
import { getAuthCookie, getUserCookie } from '@/utils/auth-cookies'
import { findUserByID } from '@/utils/graphql-requests'
import { League } from '@/utils/types'
import { NextPageContext } from 'next'
import Link from 'next/link'

const Guess = ({ data }: { data: [League]}) => {


	return (
		<Layout>
			<div className="flex flex-col items-center">
				<p className="text-lg text-center">
					Choose a league and start guessing!
				</p>
				{data.map((league: League) => (
					<div key={league.slug} className="my-8">
						<Link href={`/guess/${league.slug}`}>
							<a className="p-4 border border-blue-400 rounded-md shadow-md hover:bg-white bg-blue-50">
								{league.name}
							</a>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const token = getAuthCookie(ctx.req)
	const userID = getUserCookie(ctx.req)

	const data = await findUserByID(token, userID)

	return {
		props: {
			data: data?.findUserByID.leagues.data
		}
	}
}

export default Guess