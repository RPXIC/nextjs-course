import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from 'components'
import fs from 'node:fs/promises'
import { useI18N } from 'context/i18n'
import styles from 'styles/Home.module.css'

export default function Home({ latestComics }) {
  const { t } = useI18N()

  return (
    <>
      <Head>
        <meta name='description' content='Comics for developers' />
      </Head>

      <Layout>
        <main className={styles.main}>
          <h2 className={styles.title}>{t('LATEST_COMICS')}</h2>
          <section className={styles.section}>
            {latestComics.map(comic => {
              return (
                <Link href={`./comic/${comic.id}`} key={comic.id}>
                  <a className={styles.link}>
                    <h3 className={styles.comicTitle}>{comic.title}</h3>
                    <Image
                      width={300}
                      height={300}
                      layout='intrinsic'
                      objectFit='contain'
                      src={comic.img}
                      alt={comic.alt}
                    />
                  </a>
                </Link>
              )
            })}
          </section>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async file => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics,
    },
  }
}
