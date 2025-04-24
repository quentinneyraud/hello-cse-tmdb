import type { AvailablePaginatedResponsesTypes, PaginatedResponse } from './tmdb'

/**
 * All query params allowed to pass to /api.
 * Merge TmdbQueryParams (read from the doc) and pick keys
 */
export type APIQueryParams<
  TmdbQueryParams = unknown,
  ResponseInterface = unknown,
  T extends AvailablePaginatedResponsesTypes = AvailablePaginatedResponsesTypes,
> =
  TmdbQueryParams &
  {
    // Custom API layer (Allow to pick some keys from response to reduce response size)
    pick?: ResponseInterface extends PaginatedResponse<T>
      ? (keyof T)[]
      : (keyof ResponseInterface)[]
  }
