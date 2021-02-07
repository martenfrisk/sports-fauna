import { useState, useEffect } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { getNewLeagueData } from '@/utils/graphql-requests'
import Layout from '@/components/layout'
import { getAuthCookie } from '@/utils/auth-cookies'
import { NextPageContext } from 'next'
const Search = ({ data }: { data: any }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [leagueList, setLeagueList] = useState<any[] | unknown[]>(null)

	useEffect(() => {
		const newArr = []
		data.allLeagues.data.forEach(item => {
			const newObj = {
				name: item.name,
				slug: item.slug
			}
			newArr.push(newObj)
		})
		setLeagueList(newArr)
	}, [])

	const searcher = (e: any) => {
		setSearchTerm(e.target.value)
	}

	const fuse = new Fuse(data.allLeagues.data, { keys: ['name'] })

	useEffect(() => {
		setSearchResults(fuse.search(searchTerm))
	}, [searchTerm])

  
	return (
		<Layout>
			<div className="flex flex-col items-center h-full py-12 my-10">
				<h1 className="my-8 text-xl">Search leagues</h1>
				<input onChange={searcher} value={searchTerm} placeholder="Search leagues" className="px-4 py-2 border-2 border-blue-500 rounded-md"  />
				<div className="flex flex-col items-start mt-10">
					{searchResults && (
						searchResults.map(result => (
							<div key={result.item.slug} className="mb-4 text-lg text-blue-700">
								<Link href={`/league/${result.item.slug}`}>
									{result.item.name}
								</Link>
							</div>
						))
					)}
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const token = getAuthCookie(ctx.req)
	let data  
	if (token) {
		data = await getNewLeagueData(token)
	}

	return {
		props: {
			token,
			data
		}
	}
}

export default Search