
import { Component } from 'react'
import Head from 'next/head'
import Link from '../link'

export default class User extends Component {
  static getInitialProps ({ query }) {
    return {
      user: query.user
    }
  }

  render () {
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <style>{bodyStyles}</style>
        </Head>
        <h2>hi {this.props.user}</h2>
      </div>
    )
  }
}

const bodyStyles = `
  html, body {
    height: 100%
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
