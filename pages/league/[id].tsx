import { useRouter } from 'next/router'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'

const League = ({ data }: { data: any }) => {

	return (
		<Layout>
			<h1>League info</h1>

			{data ? (
				<div>
					<h2>
						League name: {data.name}
					</h2>
					League members: 
					{data.members.data.length > 0 ? (
						data.members.data.map((item) => (
							<div key={item.username}>
								{item.username} ({item.email})
							</div>
						))
					) : (
						<span className="ml-2 text-sm italics">
							No members :(
						</span>
					)}

				</div>
			): (
				<div>Loading...</div>
			)}
		</Layout>
	)
}


export async function getServerSideProps(ctx: any) {
	const { id } = ctx.params
	const token = getAuthCookie(ctx.req)
	const query = gql`
		query FindLeague($id: ID!) {
			findLeagueByID(id: $id) {
				name
				members {
					data {
						_id
						username
						email
					}
				}
			}
		}`
	const res = await graphQLClient(token).request(query, {id})
	console.log(res)
	const data = await res

	return { props: { 
		data: data?.findLeagueByID
	} }
}


export default League