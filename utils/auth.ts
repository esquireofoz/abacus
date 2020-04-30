import qs from 'querystring'

/**
 * Resolves the OAuth client ID based on the host.
 *
 * @param host
 */
const resolveClientId = (host: string) => {
  switch (host) {
    case 'experiments.a8c.com':
      return 68795
    case 'localhost:3000':
    case 'a8c-abacus-local:3000':
    default:
      return 68797
  }
}

/**
 * Determines whether to accept messages from the specified origin.
 *
 * @param origin
 */
const acceptMessagesFrom = (origin: string): boolean => {
  return /(^https?:\/\/a8c-abacus-local:3000)|(^https:\/\/experiments.a8c.com)|localhost/.test(origin)
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
