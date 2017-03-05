# Route

Simplified custom routing for [next.js](https://github.com/zeit/next.js).

This module is high-level, but will cover your 99% use case.

It comes with the following interfaces:

```js
// server-side request handler
import Route from 'next-route'

// universal <Link /> proxy component
import Link from 'next-route/link'

// universal <Router /> proxy component
import Router from 'next-route/router'
```

## Usage

```js
const app = require('next')({ dev: true })
const Route = require('next-route')

app.prepare().then(() => {
  createServer(Route(app))
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

## Specifying Routes

This map will be pulled in from your `package.json`:

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

## Using `<Link />` & `Router`

Once you start using custom routing like this, your `<Link />` and `Router` functions get a bit more difficult. For example, if we have a `blogpost` at `/hello-world`, in order to get the routing working properly, we'll need to do the following:

```
<Link href="/blogpost?post=hello-world" as="/hello-world">Hello World</Link>
```

This is certainly doable, but `next-route` provides a bit of sugar over this to bring back the old functionality:

```
import Link from 'next-route/link'
<Link href="/hello-world">Hello World</Link>
```

Which will format the props and pass them into `next/link`. The same goes for `Router`'s `push` and `replace` methods.

> Note that router is not a full replacement for `next/router`. Use this library only for its Router.push & Router.replace methods.

## Installation

```sh
npm install next-route
```

## License

MIT
