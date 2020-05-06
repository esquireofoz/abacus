import debugFactory from 'debug'
import { AppProps } from 'next/app'
import qs from 'querystring'
import React from 'react'

import RenderErrorBoundary from '@/components/RenderErrorBoundary'
import RenderErrorView from '@/components/RenderErrorView'

import { onRenderError } from '@/event-handlers/index'

import { getAuthClientId, getExperimentsAuthInfo } from '@/utils/auth'

const debug = debugFactory('abacus:pages/_app.tsx')

const App = React.memo(function App(props: AppProps) {
  debug('App#render')
  const { Component: Route, pageProps: routeProps } = props

  if (typeof window !== 'undefined') {
    // Prompt user for authorization if we don't have auth info.
    const experimentsAuthInfo = getExperimentsAuthInfo()
    if (!experimentsAuthInfo) {
      const authPath = 'https://public-api.wordpress.com/oauth2/authorize'
      const authQuery = {
        client_id: getAuthClientId(window.location.host),
        redirect_uri: `${window.location.origin}/auth`,
        response_type: 'token',
        scope: 'global',
      }

      const authUrl = `${authPath}?${qs.stringify(authQuery)}`
      window.location.replace(authUrl)
    }
  }

  return (
    <RenderErrorBoundary onError={onRenderError}>
      {({ renderError }) => (
        <>
          {renderError ? (
            <RenderErrorView renderError={renderError} />
          ) : (
            <div className='app'>
              <Route {...routeProps} />
            </div>
          )}
        </>
      )}
    </RenderErrorBoundary>
  )
})

export default App
