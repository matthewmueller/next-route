const development = process.env.NODE_ENV !== 'production'
const { createServer } = require('http')
const Route = require('./')
const next = require('next')

const app = next({ dev: development })

app.prepare().then(() => {
  createServer(Route(app))
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
