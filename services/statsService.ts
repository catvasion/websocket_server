import axios from 'axios'
import { regions } from '../utils/constants'
import { Stat } from '../types'

const getStats = async (region: string): Promise<Stat> => {
	const url = `https://data--${region}.upscope.io/status?stats=1`
	const response = await axios.get(url)
	return response.data
}
const sanitiseStats = (statList: Stat) => {
	const region = statList.region
	const status = statList.status
	const stats = [
		{
			title: 'Server Issues',
			contents: [{ key: 'Issues', value: statList.server_issue || 0 }],
		},
		{
			title: 'Service Status',
			contents: [
				{ key: 'Redis', value: statList.results.services.redis },
				{ key: 'Database', value: statList.results.services.database },
			],
		},
		{
			title: 'Server Stats',
			contents: [
				{ key: 'Servers', value: statList.results.stats.servers_count },
				{
					key: 'Active Connections',
					value: statList.results.stats.server.active_connections,
				},
				{ key: 'Online Users', value: statList.results.stats.online },
				{ key: 'CPU Load', value: statList.results.stats.server.cpu_load },
				{ key: 'Wait Time', value: statList.results.stats.server.wait_time },
				{ key: 'Session Count', value: statList.results.stats.session },
				{ key: 'Timers Count', value: statList.results.stats.server.timers },
			],
		},
	]

	return { region, status, stats }
}

export const getAllStats = async () => {
	const statsByRegion = []

	for (const region of regions) {
		try {
			const statList = await getStats(region)
			const sanitisedStats = sanitiseStats(statList)
			statsByRegion.push(sanitisedStats)
		} catch (error) {
			console.error(`Error fetching stats for region ${region}:`, error)
		}
	}

	return statsByRegion
}
