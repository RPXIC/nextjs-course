import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from 'components'
import { readdir, readFile, stat } from 'fs/promises'
import { basename } from 'path'
import styles from 'styles/Comic.module.css'

export default function Comic({ id, img, alt, title, width, height, hasPrevious, hasNext, prevId, nextId }) {
  return (
    <>
      <Head>
        <title>xkcd - comics for developers</title>
        <meta name='description' content='Comics for developers' />
      </Head>

      <Layout>
        <main>
          <section className={styles.container}>
            <h1>{title}</h1>
            <div className={styles.image}>
              <Image width={width} height={height} layout='intrinsic' objectFit='contain' src={img} alt={alt} />
            </div>
            <p>{alt}</p>

            <div className={styles.navigation}>
              {hasPrevious && (
                <Link href={`./${prevId}`}>
                  <a className={styles.link}>
                    <h3>⬅ Previous</h3>
                  </a>
                </Link>
              )}
              {hasNext && (
                <Link href={`./${nextId}`}>
                  <a className={styles.link}>
                    <h3>Next ➡</h3>
                  </a>
                </Link>
              )}
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics')
  let paths = []

  locales.forEach(locale => {
    paths = paths.concat(
      files.map(file => {
        const id = basename(file, '.json')
        return { params: { id }, locale }
      })
    )
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId,
    },
  }
}
