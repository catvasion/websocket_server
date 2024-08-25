import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { getAllStats } from './statsService'

export const setupWebSocket = (server: Server) => {
	const wsServer = new WebSocketServer({ server })

	wsServer.on('connection', async (connection) => {
		const data = await getAllStats()
		connection.send(JSON.stringify(data))

		const intervalId = setInterval(async () => {
			const data = await getAllStats()
			connection.send(JSON.stringify(data))
		}, 60000)

		connection.on('close', () => {
			console.log('Client disconnected')
			clearInterval(intervalId)
		})
	})
}
