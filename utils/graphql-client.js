import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://graphql.fauna.com/graphql'

export const graphQLClient = (token) => {
	
	const secret = process.env.NEXT_PUBLIC_FAUNA_SECRET

	return new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${secret}`,
		},
	})
}
