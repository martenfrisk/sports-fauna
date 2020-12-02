import { useEffect, useState } from 'react'
// import { gql } from 'graphql-request'
import useSWR from 'swr'
import Layout from '@/components/layout'
import { getAuthCookie } from '@/utils/auth-cookies'
// import { graphQLClient } from '@/utils/graphql-client'
import EditUser from '@/components/edit-user'

const Profile = ({ token }: {token: any}) => {
	const [userData, setUserData] = useState({
		username: '',
		id: '',
		email: '',
		favTeam: '',
		leagues: ''
	})
	const fetcher = (url) => fetch(url).then((r) => r.json())
	const { data, error } = useSWR('/api/user', fetcher)
	useEffect(() => {
		setUserData(data)
		console.log(data)
	}, [data])
	if (error) {
		console.log(error)	
		return (
			<Layout>
				<div>Error...</div>
			</Layout>
		)
	}
	return (
		<Layout>
			<div className="flex flex-col items-center w-full">
				<h1 className="mb-4 text-2xl">User profile</h1>
				{ userData ? (
					<div className="flex flex-col mt-4">
						<div className="flex flex-wrap justify-between mb-4" key={userData.id}>
							<p className="w-1/2">Username:</p>
							<p className="w-1/2">{userData.username}</p>
							<p className="w-1/2">Email:</p>
							<p className="w-1/2">{userData.email}</p>
							{userData.favTeam && (
								<>
									<p className="w-1/2">Team:</p>
									<p className="w-1/2">{userData.favTeam}</p>
								</>
							)} 
						</div>
						<EditUser defaultValues={userData} setData={setUserData} id={userData.id} token={token} />
					</div>
				) : (
					<div>Loading...</div>
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