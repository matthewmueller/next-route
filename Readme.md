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

## Specifying Routes

This map will be pulled in from your package.json, or you can bring it in yourself by doing `route(app, require('package.json').customRoutes)`.

```json
"routes": {
    "/": "/landing",
    "/:date/:post": "/blogpost",
    "/:post": "/blogpost",
    "/about": "/about",
    "/404": "/404",
  }
```

Things to note:

- The routing map uses the same logic and low-level module as express's routing. 
- Any parameters resolved by the routing (e.g. ":post") will be passed into `getInitialProps` as query parameters

## Installation

```sh
npm install next-route
```

## License

MIT
