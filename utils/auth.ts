import qs from 'querystring'

/**
 * Resolves the OAuth client ID based on the host.
 *
 * @param host
 */
const resolveClientId = (host: string) => {
  let clientId = 68797
  if (host === 'experiments.a8c.com') {
    clientId = 68795
  }
  return clientId
}

/**
 * Determines whether to accept messages from the specified origin.
 *
 * @param origin
 */
const acceptMessagesFrom = (origin: string): boolean => {
  return /(^https?:\/\/a8c-abacus-local:3000)|(^https:\/\/experiments.a8c.com)|localhost(:\d{4,5})?$/.test(origin)
}

interface ExperimentsApiAuthInfo {
  accessToken: string
  expiresAt: number | null
  scope: string
  type: string
}

const EXPIRATION_BUFFER = 12 * 60 * 60 * 1000

/**
 * Returns the saved experiments API auth info if available and has not expired.
 */
const getExperimentsApiAuth = (): ExperimentsApiAuthInfo | null => {
  try {
    const experimentsApiAuth = JSON.parse(localStorage.getItem('experiments_api_auth') || 'null')
    if (experimentsApiAuth && experimentsApiAuth.expiresAt - EXPIRATION_BUFFER > Date.now()) {
      return experimentsApiAuth
    }
  } catch (err) {
    /* istanbul ignore next */
    console.error(err)
  }
  return null
}

/**
 * Saves the experiments API auth info for later retrieval.
 *
 * @param {ExperimentsApiAuthInfo} experimentsApiAuth
 */
const saveExperimentsApiAuth = (experimentsApiAuth: ExperimentsApiAuthInfo | null) => {
  experimentsApiAuth === null
    ? localStorage.removeItem('experiments_api_auth')
    : localStorage.setItem('experiments_api_auth', JSON.stringify(experimentsApiAuth))
}

/**
 * Replaces the current document with the Abacus auth page.
 */
const replaceWithAuthPage = () => {
  window.location.replace(`${window.location.origin}/auth`)
}

/**
 * Replaces the current document with the WP.com OAuth authorize page.
 */
const replaceWithOAuth = () => {
  const authPath = 'https://public-api.wordpress.com/oauth2/authorize'
  const authQuery = {
    client_id: resolveClientId(window.location.host),
    redirect_uri: `${window.location.origin}/auth`,
    response_type: 'token',
    scope: 'global',
  }

  const authUrl = `${authPath}?${qs.stringify(authQuery)}`
  window.location.replace(authUrl)
}

export { acceptMessagesFrom, getExperimentsApiAuth, replaceWithAuthPage, replaceWithOAuth, saveExperimentsApiAuth }
