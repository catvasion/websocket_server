import http from 'http'

const port = 3000
const server = http.createServer()

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`)
})
