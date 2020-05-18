import { MetricBare } from '@/models/index'

import { ApiData } from './ApiData'
import { fetchApi } from './utils'

/**
 * Finds all the available metrics.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll(): Promise<MetricBare[]> {
  const result = await fetchApi('GET', '/metrics')
  return result.metrics.map((apiData: ApiData) => new MetricBare(apiData))
}

const MetricsApi = {
  findAll,
}

export default MetricsApi
