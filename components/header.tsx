import { UserContext } from '@/utils/user-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'

const Header = () => {
	const router = useRouter()
	const { setUserID } = useContext(UserContext)
	// const fetcher = (url) => fetch(url).then((r) => r.json())
	
	const fetcher = (url) => fetch(url).then((r) => r.json())
	
	const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher)
	
	useEffect(() => {
		setUserID(user)
	}, [user])

	const logout = async () => {
		const res = await fetch('/api/logout')
		if (res.ok) {
			mutateUser(null)
			router.push('/')
		}
	}

	return (
		<div className="flex justify-center mb-4">
			<header className="flex flex-wrap items-center justify-between w-full max-w-4xl px-6 py-6 text-gray-700">
				<Link href="/">
					<h1 className="mb-2 text-4xl font-semibold tracking-tight text-blue-700 lowercase sm:mb-0 sm:w-auto sm:text-4xl">Sport Guesser</h1>
				</Link>

				{user ? (
					<div className="flex justify-between w-full space-x-2 sm:w-auto sm:space-x-4">

						<div>
							<Link href="/guess">
								<a className="transition-all duration-300 transform shadow-none rounded-2xl hover:text-blue-700">Guess</a>
							</Link>
						</div>
						<div>
							<Link href="/profile">
								<a className="transition-all duration-300 transform shadow-none rounded-2xl hover:text-blue-700">Profile</a>
							</Link>
						</div>
						<div>
							<span onClick={logout} className="transition-all duration-300 transform cursor-pointer select-none hover:text-blue-700">Logout</span>
						</div>
					</div>
				) : (
					<Link href="/login">
						<a className="px-3 py-2 text-blue-700 transition-all duration-300 transform border-2 border-blue-500 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-white to-blue-50 ">Login</a>
					</Link>
				)}
			</header>
		</div>
	)
}

export default Header