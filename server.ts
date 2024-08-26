import http from 'http'
import { setupWebSocket } from './services/websocketService'

const server = http.createServer()
setupWebSocket(server)
