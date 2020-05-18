import { ExperimentBare } from '@/models/index'
import { getExperimentsAuthInfo } from '@/utils/auth'

import { ApiData } from './ApiData'
import UnauthorizedError from './UnauthorizedError'
import { resolveApiUrlRoot, PRODUCTION_API_URL_ROOT } from './utils'

/**
 * Finds all the available experiments.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll(): Promise<ExperimentBare[]> {
  const apiUrlRoot = resolveApiUrlRoot()

  let headers
  if (apiUrlRoot === PRODUCTION_API_URL_ROOT) {
    const accessToken = getExperimentsAuthInfo()?.accessToken
    if (!accessToken) {
      throw new UnauthorizedError()
    }
    headers = new Headers({ Authorization: `Bearer ${accessToken}` })
  }

  const fetchUrl = `${apiUrlRoot}/experiments`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((result) => result.experiments.map((apiData: ApiData) => new ExperimentBare(apiData)))
}

const ExperimentsApi = {
  findAll,
}

export default ExperimentsApi
