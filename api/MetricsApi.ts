import { MetricBare } from '@/models/index'
import { getExperimentsAuthInfo } from '@/utils/auth'

import { ApiData } from './ApiData'
import UnauthorizedError from './UnauthorizedError'
import { resolveApiUrlRoot, PRODUCTION_API_URL_ROOT } from './utils'

/**
 * Finds all the available metrics.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll(): Promise<MetricBare[]> {
  const apiUrlRoot = resolveApiUrlRoot()
  const isProduction = apiUrlRoot === PRODUCTION_API_URL_ROOT

  let accessToken
  if (isProduction) {
    accessToken = getExperimentsAuthInfo()?.accessToken
    if (!accessToken) {
      throw new UnauthorizedError()
    }
  }

  const fetchUrl = `${apiUrlRoot}/metrics`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: isProduction ? new Headers({ Authorization: `Bearer ${accessToken}` }) : undefined,
  })
    .then((response) => response.json())
    .then((result) => result.metrics.map((apiData: ApiData) => new MetricBare(apiData)))
}

const MetricsApi = {
  findAll,
}

export default MetricsApi
