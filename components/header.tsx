import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Header = () => {
	const router = useRouter()

	const fetcher = (url) => fetch(url).then((r) => r.json())

	const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher)

	const logout = async () => {
		const res = await fetch('/api/logout')
		if (res.ok) {
			mutateUser(null)
			router.push('/login')
		}
	}

	return (
		<div className="flex justify-center mb-4 bg-blue-200 shadow-md">
			<header className="flex justify-between w-full max-w-3xl py-4 text-gray-700">
				<Link href="/">
					<a className="text-xl">Home</a>
				</Link>

				<div className="flex space-x-4">
					{user ? (
						<>
							<div>
								<Link href="/profile">
									<a>Profile</a>
								</Link>
							</div>
							<div>
								<button onClick={logout}>Logout</button>
							</div>
						</>
					) : (
						<>
							<div>
								<Link href="/login">
									<a>Login</a>
								</Link>
							</div>
							<div>
								<Link href="/signup">
									<a>Signup</a>
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