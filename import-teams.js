import { gql } from 'graphql-request'
import { graphQLClient } from './utils/graphql-client.js'
import dotenv from 'dotenv'
dotenv.config()

const teamSearch = [
	{
		'name': 'Arsenal',
		'id': '133604',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/a1af2i1557005128.png',
		'country': 'England'
	},
	{
		'name': 'Aston Villa',
		'id': '133601',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/aofmzk1565427581.png',
		'country': 'England'
	},
	{
		'name': 'Brighton',
		'id': '133619',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/ywypts1448810904.png',
		'country': 'England'
	},
	{
		'name': 'Burnley',
		'id': '133623',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/sqrttx1448811003.png',
		'country': 'England'
	},
	{
		'name': 'Chelsea',
		'id': '133610',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png',
		'country': 'England'
	},
	{
		'name': 'Crystal Palace',
		'id': '133632',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/rytxyw1448813222.png',
		'country': 'England'
	},
	{
		'name': 'Everton',
		'id': '133615',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/eqayrf1523184794.png',
		'country': 'England'
	},
	{
		'name': 'Fulham',
		'id': '133600',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png',
		'country': 'England'
	},
	{
		'name': 'Leeds',
		'id': '133635',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/g0eqzw1598804097.png',
		'country': 'England'
	},
	{
		'name': 'Leicester',
		'id': '133626',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/xtxwtu1448813356.png',
		'country': 'England'
	},
	{
		'name': 'Liverpool',
		'id': '133602',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/uvxuqq1448813372.png',
		'country': 'England'
	},
	{
		'name': 'Man City',
		'id': '133613',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png',
		'country': 'England'
	},
	{
		'name': 'Man United',
		'id': '133612',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png',
		'country': 'England'
	},
	{
		'name': 'Newcastle',
		'id': '134777',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/rqvwxt1448813396.png',
		'country': 'England'
	},
	{
		'name': 'Sheffield United',
		'id': '133811',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/qutsut1424032614.png',
		'country': 'England'
	},
	{
		'name': 'Southampton',
		'id': '134778',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/qusxss1448813481.png',
		'country': 'England'
	},
	{
		'name': 'Tottenham',
		'id': '133616',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/dfyfhl1604094109.png',
		'country': 'England'
	},
	{
		'name': 'West Brom',
		'id': '133611',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/rsvuxw1448813527.png',
		'country': 'England'
	},
	{
		'name': 'West Ham',
		'id': '133636',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/yutyxs1467459956.png',
		'country': 'England'
	},
	{
		'name': 'Wolves',
		'id': '133599',
		'badgeImg': 'https://www.thesportsdb.com/images/media/team/badge/qwvuqy1448811552.png',
		'country': 'England'
	}
]

const token = process.env.NEXT_FAUNA_ADMIN_SECRET // add dotenv to use

teamSearch.forEach(async (team) => {
	const query = gql`
		mutation InsertTeams(
			$teamId: String
			$teamName: String
			$badge: String
			$country: String
			$division: [ID]
		) {
			createTeamType(
				data: {
					teamId: $teamId
					teamName: $teamName
					division: {
						connect: $division
					} 
					badge: $badge
					country: $country
				}
			) {
				country
					teamName
					teamId
				division {
					data {
						divisionName
					}
				}
			}
		}
	`

	const variables = {
		teamId: team.id,
		teamName: team.name,
		badge: team.badgeImg,
		country: team.country,
		division: '284329123967402501'
	}
	try {
		await graphQLClient(token).request(query, variables)
			.then((data) => console.log(data))
	} catch (error) {
		console.error(error)
	}
})