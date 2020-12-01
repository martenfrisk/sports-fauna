import { useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'
import { graphQLClient } from '../utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'

const New = ({token}: {token: any}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const { handleSubmit, register, errors } = useForm()
	const { data: user } = useSWR('/api/user')

	const onSubmit = handleSubmit(async ({ task }) => {
		if (errorMessage) setErrorMessage('')

		const mutation = gql`
      mutation CreateATodo($task: String!, $owner: ID!) {
        createTodo(data: { task: $task, completed: false, owner: { connect: $owner } }) {
          task
          completed
					owner {
						_id
					}
        }
      }
		`
		
		const variables = {
			task,
			owner: user && user.id,
		}

		try {
			await graphQLClient(token).request(mutation, variables)
			Router.push('/')
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	return (
		<Layout>
			<h1 className="text-3xl">Create new todo</h1>
			<div className="flex flex-col items-center w-full">

				<form onSubmit={onSubmit}>
					<div  className="flex flex-col">
						<label>Task</label>
						<input
							type="test"
							name="task"
							className="px-4 py-2 text-gray-700 border border-blue-400 rounded-md"
							placeholder="e.g. do something"
							ref={register({ required: 'Task is required' })}
						/>
						{errors.task && (
							<span role="alert">
								{errors.task.message}
							</span>
						)}
					</div>

					<div className="mt-2">
						<button type="submit" className="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-tr from-blue-800 to-blue-400">Create</button>
					</div>
				</form>

				{errorMessage && (
					<p role="alert">
						{errorMessage}
					</p>
				)}
			</div>
		</Layout>
	)
}


export const getServerSideProps = (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	return { props: { token: token || null } }
}


export default New
