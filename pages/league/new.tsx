import { useState } from 'react'
// import Router from 'next/router'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import Layout from '../../components/layout'
import { db } from '@/utils/firebase'
import LeagueOptions from '@/components/league-options'
import TeamPicker from '@/components/teampicker'
import { useRouter } from 'next/router'
import { getUserCookie } from '@/utils/auth-cookies'
import { UserFromDBType } from '@/utils/types/firebase-types'
import { getAllTeams } from '@/utils/firebase-requests'
import Link from 'next/link'
import {
	withAuthUser,
	useAuthUser,
	AuthAction,
	withAuthUserTokenSSR,
} from 'next-firebase-auth'

const New = ({
	teams,
	userData,
}: {
  teams: any
  userData: UserFromDBType
}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [pickedTeams, setPickedTeams] = useState([])
	const [isPublic, setIsPublic] = useState(true)
	const [leagueName, setLeagueName] = useState('')
	const { handleSubmit, errors } = useForm()
	const AuthUser = useAuthUser()
	const userID = AuthUser.id
	// const { userID } = useContext(UserContext)
	const Router = useRouter()

	const onSubmit = handleSubmit(async () => {
		if (errorMessage) setErrorMessage('')
		const slug = slugify(leagueName, { lower: true })

		const variables = {
			name: leagueName,
			slug,
			members: {
				[userID]: {
					username: userData.username
				} 
			},
			public: isPublic,
			teams: pickedTeams,
		}

		await fetch('/api/league/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(variables),
		})
			.then(async (res) => {
				if (res.ok) {
					Router.push('/')
				} else {
					const msg = await res.text()
					setErrorMessage(msg)
				}
			})
			.catch((error) => {
				console.error(error)
				setErrorMessage(error.message)
			})
	})

	return (
		<Layout>
			<h1 className="w-full mt-4 text-3xl text-center">Create new league</h1>
			{userData ? (
				<div className="flex flex-col items-center w-full">
					{errorMessage && (
						<p
							role="alert"
							className="w-1/2 my-8 text-base text-center text-red-700"
						>
							{/* {errorMessage.split(':')[0]} */}
							{errorMessage}
						</p>
					)}
					<form>
						<div className="flex flex-col items-center">
							<label className="mb-2">League name</label>
							<input
								type="text"
								name="name"
								className="px-4 py-2 text-gray-700 border border-blue-400 rounded-md"
								placeholder="Your League name"
								value={leagueName}
								onChange={(e) => setLeagueName(e.target.value)}
							/>
							{errors.name && (
								<span role="alert" className="text-xs text-red-800">
									{errors.name.message}
								</span>
							)}
						</div>
					</form>
					{/* <p className="my-2">Options</p> */}
					{/* <LeagueOptions optionsData={[isPublic, setIsPublic]} /> */}

					<TeamPicker picker={[pickedTeams, setPickedTeams]} teams={teams} />
					<button
						type="submit"
						className={`mt-4 btn-blue ${
							pickedTeams.length === 0 ? 'cursor-not-allowed' : ''
						}`}
						onClick={onSubmit}
						disabled={pickedTeams.length < 1}
					>
            Create
					</button>
				</div>
			) : (
				<p>
          Please{' '}
					<Link href="/login">
						<a className="underline">log in</a>
					</Link>{' '}
          before creating a league.
				</p>
			)}
		</Layout>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
	const teams = await getAllTeams('2021')
	const userID = await AuthUser.id
	const userData = await db
		.ref(`users/${userID}`)
		.get()
		.then((data) => data.toJSON())

	return {
		props: {
			userData: userData || null,
			teams: teams || null,
		},
	}
})

export default withAuthUser()(New)