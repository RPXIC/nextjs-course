import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from 'components'
import { search } from 'services/search'

export default function Search({ query, results }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name='description' content={`Search for ${query}`} />
      </Head>

      <Layout>
        <>
          <h1>
            {results.length} results for {query}
          </h1>
          {results.map(result => (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a>
                <Image width={50} height={50} alt={result.alt} src={result.img} />
                <h2>{result.title}</h2>
              </a>
            </Link>
          ))}
        </>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results,
    },
  }
}
