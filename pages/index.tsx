import useSWR from 'swr'
import Link from 'next/link'
import { gql } from 'graphql-request'
import Layout from '../components/layout'
import { graphQLClient } from '../utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'

const Home = ({token}: { token: any }) => {
	const fetcher = async (query) => await graphQLClient(token).request(query)
	const { data, error, mutate } = useSWR(
		gql`
      {
        allTodos {
          data {
            _id
            task
            completed
          }
        }    
      }
    `, fetcher
	)

	if (error) return (
		<Layout>
			<div>Error...</div>
		</Layout>
	)

	const toggleTodo = async (id, completed) => {
		const query = gql`
      mutation PartialUpdateTodo($id: ID!, $completed: Boolean!) {
        partialUpdateTodo(id: $id, data: { completed: $completed }) {
          _id
          completed
        }
      }
    `

		const variables = {
			id,
			completed: !completed,
		}

		try {
			await graphQLClient(token)
				.setHeader('X-Schema-Preview', 'partial-update-mutation')
				.request(query, variables)
			mutate()
		} catch (error) {
			console.error(error)
		}
	}

	const deleteATodo = async (id) => {
		const query = gql`
      mutation DeleteATodo($id: ID!) {
        deleteTodo(id: $id) {
          _id
        }
      }
    `

		try {
			await graphQLClient(token).request(query, { id })
			mutate()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Layout>
			<div className="flex flex-col w-full max-w-3xl">
				<h1 className="text-3xl">Next Fauna GraphQL</h1>
				<div className="mt-2 mb-6">
					<Link href="/new">
						<a className="px-4 py-2 text-white rounded-md hover:underline hover:text-blue-700 bg-gradient-to-tr from-blue-800 to-blue-500">Create new</a>
					</Link>
				</div>
     
				{data ? (
					<div>
						{data.allTodos.data.map((todo) => (
							<div key={todo._id} className="flex justify-start w-full my-2">
								<span
									onClick={() => toggleTodo(todo._id, todo.completed)}
									className={`w-1/2 cursor-pointer italic hover:text-blue-700 ${todo.completed ? 'line-through' : 'no-underline'}`}
								>
									{todo.task}
								</span>
								<Link href="/todo/[id]" as={`/todo/${todo._id}`}>
									<a className="px-2 mx-2 border-2 border-blue-700 rounded-md">Edit</a>
								</Link>
								<span onClick={() => deleteATodo(todo._id)} className="px-2 border-2 border-red-700 rounded-md">
                Delete
								</span>
							</div>
						))}
					</div>
				): (
					<div>Loading...</div>
				)}

			</div>
		</Layout>
	)
}

export const getServerSideProps = (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	return { props: { token: token || null } }
}

export default Home