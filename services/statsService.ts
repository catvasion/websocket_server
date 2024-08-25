import axios from 'axios'
import { regions } from '../utils/constants'
import { Stat } from '../types'

const getStats = async (region: string): Promise<Stat> => {
	const url = `https://data--${region}.upscope.io/status?stats=1`
	const response = await axios.get(url)
	return response.data
}

export const getAllStats = async () => {
	const statsByRegion = []

	for (const region of regions) {
		try {
			const stats = await getStats(region)
			statsByRegion.push(stats)
		} catch (error) {
			console.error(`Error fetching stats for region ${region}:`, error)
		}
	}

	return statsByRegion
}
