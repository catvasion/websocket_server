import http from 'http'
import { getAllStats } from './services/statsService'

const port = 3000
const server = http.createServer()

server.listen(port, async () => {
	console.log(`Server running at http://localhost:${port}/`)
	const fetchedStats = await getAllStats()
	console.log('Fetched stats: ', fetchedStats)
})
