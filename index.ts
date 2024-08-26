import http from 'http'
import { setupWebSocket } from './services/websocketService'
const port = process.env.PORT || 3000
const server = http.createServer()
setupWebSocket(server)
server.listen(port, () => {
	console.log(`WebSocket server is running on port ${port}`)
})
