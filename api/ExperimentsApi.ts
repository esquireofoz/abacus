import { ExperimentBare } from '@/models/index'

import { ApiData } from './ApiData'
import { fetchApi } from './utils'

/**
 * Finds all the available experiments.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll(): Promise<ExperimentBare[]> {
  const result = await fetchApi('GET', '/experiments')
  return result.experiments.map((apiData: ApiData) => new ExperimentBare(apiData))
}

const ExperimentsApi = {
  findAll,
}

export default ExperimentsApi
