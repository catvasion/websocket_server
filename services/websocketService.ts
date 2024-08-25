import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { getCachedStats } from './cacheService'

export const setupWebSocket = (server: Server) => {
	const wsServer = new WebSocketServer({ server })

	wsServer.on('connection', async (connection) => {
		const data = await getCachedStats()
		connection.send(JSON.stringify(data))

		const intervalId = setInterval(async () => {
			const data = await getCachedStats()
			connection.send(JSON.stringify(data))
		}, 60000)

		connection.on('close', () => {
			console.log('Client disconnected')
			clearInterval(intervalId)
		})
	})
}
