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
		<div className="flex justify-center mb-4 border-b-2 border-blue-500 shadow-sm">
			<header className="flex items-center justify-between w-full max-w-3xl py-4 text-gray-700">
				<Link href="/">
					<a className="text-2xl text-blue-800">Home</a>
				</Link>

				<div className="flex space-x-4">
					{user ? (
						<>
							<div>
								<Link href="/guess">
									<a className="px-2 py-1 transition-all duration-300 transform border-2 border-blue-500 shadow-none rounded-2xl hover:shadow-lg">Guess</a>
								</Link>
							</div>
							<div>
								<Link href="/profile">
									<a className="px-2 py-1 transition-all duration-300 transform border-2 border-blue-500 shadow-none rounded-2xl hover:shadow-lg">Profile</a>
								</Link>
							</div>
							<div>
								<span onClick={logout} className="px-2 py-1 transition-all duration-300 transform border-2 border-blue-500 shadow-none rounded-2xl hover:shadow-lg">Logout</span>
							</div>
						</>
					) : (
						<>
							<div>
								<Link href="/login">
									<a className="px-2 py-1 transition-all duration-300 transform border-2 border-blue-500 shadow-none rounded-2xl hover:shadow-lg">Login</a>
								</Link>
							</div>
							<div>
								<Link href="/signup">
									<a className="px-2 py-1 transition-all duration-300 transform border-2 border-blue-500 shadow-none rounded-2xl hover:shadow-lg">Signup</a>
								</Link>
							</div>
						</>
					)}
				</div>
			</header>
		</div>
	)
}

export default Header