import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { getCachedStats } from './cacheService'

const maxConnections = 5
let currentConnections = 0

export const setupWebSocket = (server: Server) => {
	const wsServer = new WebSocketServer({ server })

	wsServer.on('connection', async (connection) => {
		if (currentConnections >= maxConnections) {
			connection.close(1013, 'Server overload')
			return
		}

		currentConnections++
		const data = await getCachedStats()
		connection.send(JSON.stringify(data))

		const intervalId = setInterval(async () => {
			const data = await getCachedStats()
			connection.send(JSON.stringify(data))
		}, 60000)

		connection.on('close', () => {
			console.log('Client disconnected')
			clearInterval(intervalId)
			currentConnections--
		})
	})
}
