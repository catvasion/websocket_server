import { getAllStats } from './statsService'

let cachedData: object | null = null
let lastFetchTime = 0

export const getCachedStats = async () => {
	const now = Date.now()
	if (!cachedData || now - lastFetchTime > 60000) {
		cachedData = await getAllStats()
		lastFetchTime = now
	}
	return cachedData
}
