import http from 'node:http'

const tasks = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
    tasks.push({
      id: 1,
      title: 'Organizar a casa',
      descritpion: 'Organizar a casa para visitas',
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    })
    return res.end('Tarefa criada com sucesso!')
  }

  return res.end('Hello World')
})
server.listen(3000)