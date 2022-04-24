import algoliasearch from 'algoliasearch/lite'
const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10,
  })

  CACHE[query] = hits

  return { results: hits }
}
