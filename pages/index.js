
import Head from 'next/head'
import Link from '../link'
import Router from '../router'
import NextLink from 'next/link'
import NextRouter from 'next/router'

export default () => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <style>{bodyStyles}</style>
    </Head>
    <h2>Link</h2>
    <Link href='/user?user=matt' as='/user/matt'><a>Manual</a></Link>
    <br />
    <Link href='/user/matt'><a>Automatic</a></Link>
    <br />
    <Link href='http://google.com'><a>Google</a></Link>
    <h2>Router</h2>
    <div onClick={() => NextRouter.push('/user?user=matt', '/user/matt')}>Manual</div>
    <div onClick={() => Router.push('/user/matt')}>Automatic</div>
    {/* <div onClick={() => NextRouter.push('http://google.com')}>Google</div> */}
  </div>
)

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
