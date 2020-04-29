import debugFactory from 'debug'
import { toInt } from 'qc-to_int'
import qs from 'querystring'
import React, { useEffect } from 'react'

import Layout from '../components/Layout'

import { replaceWithOAuth } from '../utils/auth'

const debug = debugFactory('pages/auth.tsx')

/**
 * The authorization page. It is expected to be opened in a popup window.
 */
const AuthPage = React.memo(function AuthPage() {
  debug('AuthPage#render')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let doReplaceWithOAuth = true
      // If we have the hash with the authorization info, then extract the info and
      // post it to the opener window.
      //
      // The hash should look something like:
      // #access_token=...&expires_in=#######&scope=global&site_id=0&token_type=bearer
      if (window.location.hash && window.location.hash.length > 1) {
        const authInfo = qs.parse(window.location.hash.substring(1))
        if (authInfo.access_token && authInfo.scope === 'global' && authInfo.token_type === 'bearer') {
          const expiresInSeconds = toInt(authInfo.expires_in)
          window.opener.postMessage(
            {
              action: 'experiments_api_authorized',
              data: {
                accessToken: authInfo.access_token,
                expiresAt: typeof expiresInSeconds === 'number' ? Date.now() + expiresInSeconds * 1000 : null,
                scope: 'global',
                siteId: authInfo.site_id,
                type: 'bearer',
              },
            },
            // We expect that the opener and this window have the same origin, and they should. If
            // they don't then we don't want to send this sensitive information to it.
            window.location.origin,
          )

          doReplaceWithOAuth = false
        }
      }

      if (doReplaceWithOAuth) {
        replaceWithOAuth()
      }
    }
  }, [])

  return (
    <Layout title='Experiments'>
      <div>TODO: Replace with a loading component.</div>
    </Layout>
  )
})

export default AuthPage
