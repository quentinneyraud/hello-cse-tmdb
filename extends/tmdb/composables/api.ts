import type { APIQueryParams } from '../types/api'
import type { Movie, MovieDetail, PaginatedResponse } from '../types/tmdb'
import { INTERNAL_API_BASE_PATH } from '../constants'

function fetchTMDBApi<
  ResponseType,
>(url: string, options: APIQueryParams<Record<string, unknown>, ResponseType>): Promise<ResponseType> {
  return $fetch(INTERNAL_API_BASE_PATH + url, {
    query: {
      include_adult: false,
      language: 'fr-FR',
      ...options,
    },
  })
}

type GetTrendingMoviesTimeWindow = 'day' | 'week'
interface GetTrendingMoviesOptions {
  page?: number
}
export function getTrendingMovies(timeWindow: GetTrendingMoviesTimeWindow, options?: APIQueryParams<GetTrendingMoviesOptions, Movie>) {
  return fetchTMDBApi<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`, {
    ...options,
  })
}

interface SearchMovieOptions {
  query: string
  include_adult?: boolean
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}
export function searchMovie(options: APIQueryParams<SearchMovieOptions, Movie>) {
  return fetchTMDBApi<PaginatedResponse<Movie>>('/search/movie', {
    ...options,
  })
}

interface GetMovieByIdOptions {
  append_to_response?: string
}
export function getMovieById(movieId: number, options?: APIQueryParams<GetMovieByIdOptions, MovieDetail>) {
  return fetchTMDBApi<MovieDetail>(`/movie/${movieId}`, {
    ...options,
  })
}
