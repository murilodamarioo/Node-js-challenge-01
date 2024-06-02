import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks')

    return response.end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
    const { title, description } = request.body

    const task = {
      id: 1,
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    database.insert('tasks', task)

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})
server.listen(3000)