import { graphQLClient } from '@/utils/graphql-client'
import { gql } from 'graphql-request'
import { useState } from 'react'
interface User {
  role: string
  username: string
  leagues: {
    data: {
      name: string
    }
  }
  email: string
  favTeam: string
  _id: string
}


const EditUser = ({ user, token }: { user: User, token: any }) => {
	const [userInfo, setUserInfo] = useState(user)
	const [unsaved, setUnsaved] = useState(false)
	const removeUser = async () => {
		const removeQuery = gql`
    mutation DeleteThisUser($id: ID!) {
      deleteUser(id: $id) {
        username
      }
    }
    `

		try {
			await graphQLClient(token).request(removeQuery, { id: user._id })
		} catch (err) {
			console.error(err)
		}
	}

	const editInfo = (event) => {
		setUserInfo(prev => ({...prev, [event.target.name]: event.target.value}))
		setUnsaved(true)
	} 

	const saveUserChanges = async (fieldToUpdate: string) => {
		const updateQuery = gql`
    mutation PartialUserUpdate($id: ID!, $data: PartialUpdateUserInput!) {
      partialUpdateUser(id: $id, data: $data) {
        username
      }
    }
    `
		try {
			await graphQLClient(token)
				.setHeader('X-Schema-Preview', 'partial-update-mutation')
				.request(updateQuery, { id: user._id, data: { [fieldToUpdate]: userInfo[fieldToUpdate] } })
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div className="flex flex-col mb-8">
			{unsaved && (<p>You have unsaved changes.</p>)}
			<button onClick={removeUser} className="text-red-700">Delete this user</button>
			<label className="flex justify-between w-1/2">
				<span>

        Username:
				</span>
				<input onChange={editInfo} name="username" value={userInfo.username} className="px-2 py-px border border-blue-500 rounded-sm" />
				<button onClick={() => saveUserChanges('username')} className="cursor-pointer" type="submit">Save</button>
			</label>
			<label className="flex justify-between w-1/2">
				<span>
        Email:
				</span>
				<input onChange={editInfo} name="email" value={userInfo.email} className="px-2 py-px border border-blue-500 rounded-sm" />
				<button onClick={() => saveUserChanges('email')} className="cursor-pointer" type="submit">Save</button>
			</label>
			<label className="flex justify-between w-1/2">
				<span>
        Favorite team:
				</span>
				<input onChange={editInfo} name="favTeam" value={userInfo.favTeam} className="px-2 py-px border border-blue-500 rounded-sm" />
				<button onClick={() => saveUserChanges('favTeam')} className="cursor-pointer" type="submit">Save</button>
			</label>
			<label className="flex justify-between w-1/2">
				<span>
        Role:
				</span>
				<input onChange={editInfo} name="role" value={userInfo.role ? userInfo.role : 'No role set'} className="px-2 py-px border border-blue-500 rounded-sm" />
				<button onClick={() => saveUserChanges('role')} className="cursor-pointer" type="submit">Save</button>
			</label>
			<details>
				<summary>Raw user data</summary>
				<pre>{JSON.stringify(userInfo, null, 2)}</pre>
			</details>
		</div>
	)
}

export default EditUser