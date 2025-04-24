import { TMDB_API_URL } from '../../constants'
import { pick } from '../utils/pick'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.TMDB_API_KEY) {
    throw new Error('Invalid TMDB_API_KEY')
  }

  try {
    const path = event.context.params!.path
    const query = getQuery(event)

    const tmdbApiResponse: Record<string, unknown> = await $fetch(path, {
      baseURL: TMDB_API_URL,
      params: {
        ...query,
      },
      headers: {
        Authorization: `Bearer ${config.TMDB_API_KEY}`,
        Accept: 'application/json',
      },
    })

    if (!query.pick)
      return tmdbApiResponse

    const pickKeys = Array.isArray(query.pick) ? query.pick : [query.pick]
    // If it's a paginated response
    if (tmdbApiResponse.results && Array.isArray(tmdbApiResponse.results)) {
      tmdbApiResponse.results = tmdbApiResponse.results
        .map(result => pick(result, pickKeys))
      return tmdbApiResponse
    }
    else {
      return pick(tmdbApiResponse, pickKeys)
    }
  }
  catch (e: any) {
    const status = e?.response?.status || 500
    setResponseStatus(event, status)
  }
}, {
  maxAge: 60 * 60,
  swr: true,
})
