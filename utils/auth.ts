/**
 * Resolves the OAuth client ID based on the host.
 *
 * @param host
 */
const getAuthClientId = (host: string) => {
  return host === 'experiments.a8c.com' ? 68795 : 68797
}

/**
 * Authorization info, as returned from OAuth call. See
 * https://developer.wordpress.com/docs/oauth2/.
 */
interface ExperimentsApiAuthInfo {
  accessToken: string
  expiresAt: number | null
  scope: string
  type: string
}

/**
 * Returns the saved experiments API auth info if available and has not expired.
 */
const getExperimentsApiAuth = (): ExperimentsApiAuthInfo | null => {
  try {
    const experimentsApiAuth = JSON.parse(localStorage.getItem('abacus_auth_info') || 'null')
    if (experimentsApiAuth && experimentsApiAuth.expiresAt > Date.now()) {
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
  if (experimentsApiAuth === null) {
    localStorage.removeItem('abacus_auth_info')
  } else {
    localStorage.setItem('abacus_auth_info', JSON.stringify(experimentsApiAuth))
  }
}

export { getAuthClientId, getExperimentsApiAuth, saveExperimentsApiAuth }
