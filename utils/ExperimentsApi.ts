import configs from '../configs'

import { getExperimentsApiAuth } from '../utils/auth'
import UnauthorizedError from '../utils/UnauthorizedError'

function requiresAuthorization(restApiUrlOrigin?: string) {
  return restApiUrlOrigin === 'https://public-api.wordpress.com'
}

/**
 * Finds all the available experiments.
 *
 * Note: Be sure to handle any errors that may be thrown.
 *
 * @throws UnauthorizedError
 */
async function findAll() {
  const {
    api: {
      rest: {
        experiments: { url },
      },
    },
  } = configs

  const headers: HeadersInit = new Headers()
  if (requiresAuthorization(url.origin)) {
    const experimentsApiAuth = getExperimentsApiAuth()
    if (experimentsApiAuth) {
      if (!experimentsApiAuth.accessToken) {
        throw new UnauthorizedError()
      }
      headers.append('Authorization', `Bearer ${experimentsApiAuth.accessToken}`)
    }
  }

  const fetchUrl = `${url.origin}${url.pathRoot}/experiments`
  return fetch(fetchUrl, {
    method: 'GET',
    headers,
  })
    .then((response) => response.json())
    .then((result) => {
      const { experiments } = result

      return experiments
    })
}

const ExperimentsApi = {
  findAll,
}

export default ExperimentsApi
