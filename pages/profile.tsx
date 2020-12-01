// import { useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import useSWR from 'swr'
import Layout from '@/components/layout'
import { getAuthCookie } from '@/utils/auth-cookies'
import { graphQLClient } from '@/utils/graphql-client'

const Profile = ({ token }: {token: any}) => {
	const fetcher = async (query) => await graphQLClient(token).request(query)
	const { data, error } = useSWR(
		gql`
		{
			allUsers {
				data {
					email
				}
			}
		}
    `, fetcher
	)
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
			{ data ? (
				<div>
					{JSON.stringify(data)}
				</div>
			) : (
				<div>Loading...</div>
			)}
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