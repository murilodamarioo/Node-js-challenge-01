import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (request, response) => {
      const tasks = database.select('tasks')

      return response.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (request, response) => {
      const { title, description } = request.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
  
      database.insert('tasks', task)
  
      return response.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: 'tasks/:id',
    handler: (request, response) => {}
  },
  {
    method: 'DELETE',
    path: 'tasks/:id',
    handler: (request, response) => {}
  },
  {
    method: 'PATCH',
    path: 'tasks/:id',
    handler: (request, response) => {}
  }
]