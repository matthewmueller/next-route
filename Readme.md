# Route

Simplified custom routing for [next.js](https://github.com/zeit/next.js).

This module is high-level, but will cover your 99% use case.

## Usage

```js
const app = require('next')({ dev: true })
const route = require('next-route')

app.prepare().then(() => {
  createServer(route(app))
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

## Installation

```sh
npm install next-route
```

## License

MIT