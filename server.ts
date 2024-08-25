import http from 'http'
import { setupWebSocket } from './services/websocketService'

const port = 3000
const server = http.createServer()
setupWebSocket(server)

server.listen(port, async () => {
	console.log(`Server running at http://localhost:${port}/`)
})
