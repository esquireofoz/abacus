import { Segment } from '@/models/index'

import { ApiData } from './ApiData'
import { fetchApi } from './utils'

/**
 * Finds all the available segments.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll(): Promise<Segment[]> {
  const result = await fetchApi('GET', '/segments')
  return result.segments.map((apiData: ApiData) => new Segment(apiData))
}

const SegmentsApi = {
  findAll,
}

export default SegmentsApi
