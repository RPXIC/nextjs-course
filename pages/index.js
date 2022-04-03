import Head from 'next/head'
import Header from 'components/Header'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs/promises'
import styles from 'styles/Home.module.css'

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - comics for developers</title>
        <meta name='description' content='Comics for developers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className={styles.main}>
        <h2 className={styles.title}>Latest Comics</h2>
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
