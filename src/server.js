import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'


const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(routes => {
    return routes.method === method && routes.path.test(url)
  })

  if (route) {
    const routeParams = request.url.match(route.path)
    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})
server.listen(3000)