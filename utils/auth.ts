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
  const accept = /(^https?:\/\/a8c-abacus-local:3000)|(^https:\/\/experiments.a8c.com)|localhost/.test(origin)
  return accept
}

interface ExperimentsApiAuthInfo {
  accessToken: string
  expiresAt: number | null
  scope: 'global'
  siteId?: number
  type: 'bearer'
}

const EXPIRATION_BUFFER = 12 * 60 * 60 * 1000

/**
 * Returns the saved experiments API auth info if available and has not expired.
 */
const getExperimentsApiAuth = (): ExperimentsApiAuthInfo | null => {
  const encodedExperimentsApiAuth = localStorage.getItem('experiments_api_auth')
  let experimentsApiAuth
  if (encodedExperimentsApiAuth) {
    try {
      experimentsApiAuth = JSON.parse(encodedExperimentsApiAuth)
      if (typeof experimentsApiAuth.expiresAt === 'number') {
        if (experimentsApiAuth.expiresAt - EXPIRATION_BUFFER < Date.now()) {
          experimentsApiAuth = null
        }
      }
    } catch (err) {
      // Ignore
    }
  }
  return experimentsApiAuth
}

/**
 * Saves the experiments API auth info for later retrieval.
 *
 * @param {ExperimentsApiAuthInfo} experimentsApiAuth
 */
const saveExperimentsApiAuth = (experimentsApiAuth: ExperimentsApiAuthInfo) => {
  localStorage.setItem('experiments_api_auth', JSON.stringify(experimentsApiAuth))
}

/**
 * Opens the Abacus authorize page in a popup window.
 */
const openAuthPopup = () => {
  // This width and height works well with the WP.com OAuth authorize page.
  const width = 600
  const height = 800
  // Pick a top left such that it is in the center of the window (not necessarily
  // the screen).
  const left = Math.max(0, (window.innerWidth - width) / 2) + window.screenX
  const top = Math.max(0, (window.innerHeight - height) / 2) + window.screenY
  const popupOpts = [
    'location=no',
    'menubar=no',
    'resizable=yes',
    'scrollbars=yes',
    'status=no',
    'toolbar=no',
    `left=${left}`,
    `top=${top}`,
    `width=${width}`,
    `height=${height}`,
  ].join()

  const authUrl = `${window.location.origin}/auth`
  window.open(authUrl, 'auth', popupOpts)
}

/**
 * Replaces the current document with the WP.com OAuth authorize page.
 */
const replaceWithOAuth = () => {
  const authPath = 'https://public-api.wordpress.com/oauth2/authorize'
  const authQuery = {
    blog: '',
    client_id: resolveClientId(window.location.host),
    redirect_uri: `${window.location.origin}/auth`,
    response_type: 'token',
    state: '',
    scope: 'global',
  }

  const authUrl = `${authPath}?${qs.stringify(authQuery)}`
  window.location.replace(authUrl)
}

export { acceptMessagesFrom, getExperimentsApiAuth, openAuthPopup, replaceWithOAuth, saveExperimentsApiAuth }
