import Head from 'next/head'
import { I18NPovider, useI18N } from 'context/i18n'
import styles from '../styles/globals.css'

function DefaultHead() {
  const { t } = useI18N()

  return (
    <Head>
      <title>{t('SEO_DEFAULT_TITLE')}</title>
      <meta name='description' content='Comics for developers' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <I18NPovider>
        <DefaultHead />
        <Component {...pageProps} />
      </I18NPovider>
    </>
  )
}

export default MyApp
