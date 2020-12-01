import { useRouter } from 'next/router'
import useSWR from 'swr'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import EditForm from '@/components/edit-form'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'

const Todo = ({ token }: { token: any }) => {
	const router = useRouter()
	const { id } = router.query

	const fetcher = async (query) => await graphQLClient(token).request(query, { id })

	const query = gql`
    query FindATodoByID($id: ID!) {
      findTodoByID(id: $id) {
        task
        completed
      }
    }
  `

	const { data, error } = useSWR([query, id], fetcher)

	if (error) return <div>Failed to load</div>

	return (
		<Layout>
			<h1>Edit todo</h1>

			{data ? (
				<EditForm defaultValues={data.findTodoByID} id={id} token={token} />
			): (
				<div>Loading...</div>
			)}
		</Layout>
	)
}


export const getServerSideProps = (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	return { props: { token: token || null } }
}


export default Todo