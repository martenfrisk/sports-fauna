import { fetcher } from '@/utils/extra-functions'
import { UserContext } from '@/utils/user-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'


const Header = () => {
	const router = useRouter()
	const { userID, setUserID } = useContext(UserContext)
	const { data, error } = useSWR('/api/user', fetcher)
	if (error) console.log(error)
	useEffect(() => {
		// console.log(data)
		if (data) {
			setUserID({ id: data.id, username: data.username })
		} else if (error) {
			setUserID(null)
			// router.push('/')
		}
	}, [data])
	const logout = async () => {
		const res = await fetch('/api/logout')
		if (res.ok) {
			setUserID(null)
			router.push('/')
		}
	}


	return (
		<div className="relative z-10 flex justify-center w-full mb-4">
			<header className="flex flex-wrap items-center justify-between w-full max-w-4xl px-6 py-6 text-gray-700 select-none">
				<Link href="/">
					<h1 className="mb-2 text-3xl font-medium tracking-tight text-blue-600 lowercase cursor-pointer font-logo sm:mb-0 sm:w-auto sm:text-4xl">Sport Guesser</h1>
				</Link>

				{userID ? (
					<div className="flex justify-between w-full space-x-2 sm:w-auto sm:space-x-4">
						<div>
							<Link href="/search">
								<a className="transition-all duration-300 transform shadow-none cursor-pointer rounded-2xl hover:text-blue-700">Search</a>
							</Link>
						</div>
						<div>
							<Link href="/guess">
								<a className="transition-all duration-300 transform shadow-none cursor-pointer rounded-2xl hover:text-blue-700">Guess</a>
							</Link>
						</div>
						<div>
							<Link href="/profile">
								<a className="transition-all duration-300 transform shadow-none cursor-pointer rounded-2xl hover:text-blue-700">Profile</a>
							</Link>
						</div>
						<div>
							<span onClick={logout} className="transition-all duration-300 transform cursor-pointer select-none hover:text-blue-700">Logout</span>
						</div>
					</div>
				) : (
					<Link href="/login">
						<a
							className="px-4 py-1 text-blue-700 transition-colors border-2 border-blue-400 border-opacity-50 rounded-lg cursor-pointer bg-gradient-to-br from-white to-blue-50 hover:border-blue-500"
							style={{ boxShadow: '0px 7px 20px -4px rgba(28, 100, 242, 0.3)' }}
						>Log in</a>
					</Link>
				)}
			</header>
		</div>
	)
}

export default Header