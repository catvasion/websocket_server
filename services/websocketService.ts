import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { getCachedStats } from './cacheService'

const maxConnections = 5
let currentConnections = 0

export const setupWebSocket = (server: Server) => {
	const wsServer = new WebSocketServer({ server })

	wsServer.on('connection', async (connection) => {
		if (currentConnections >= maxConnections) {
			const errorResponse = {
				data: null,
				error: {
					code: 1013,
					message: 'Server overload',
				},
			}
			connection.send(JSON.stringify(errorResponse))
			connection.close()
			return
		}

		currentConnections++
		let intervalId: NodeJS.Timeout | null = null

		const handleClose = () => {
			if (intervalId) clearInterval(intervalId)
			currentConnections--
		}
		try {
			const data = await getCachedStats()

			connection.send(
				JSON.stringify({
					data,
					error: null,
				})
			)

			intervalId = setInterval(async () => {
				const data = await getCachedStats()

				connection.send(
					JSON.stringify({
						data,
						error: null,
					})
				)
			}, 60000)
		} catch (error) {
			const errorResponse = {
				data: null,
				error: {
					code: 500,
					message: 'Internal Server Error: Unable to fetch or process data',
				},
			}
			connection.send(JSON.stringify(errorResponse))
		} finally {
			connection.on('close', handleClose)
		}
	})
}
