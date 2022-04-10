import Head from 'next/head'
import styles from '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>xkcd - comics for developers</title>
        <meta name='description' content='Comics for developers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
