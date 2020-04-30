import debugFactory from 'debug'
import { AppProps } from 'next/app'
import React from 'react'

import { getExperimentsApiAuth, replaceWithOAuth } from '../utils/auth'

const debug = debugFactory('abacus:pages/_app.tsx')

const App = React.memo(function App(props: AppProps) {
  debug('App#render')
  const { Component: Route, pageProps: routeProps } = props

  if (typeof window !== 'undefined') {
    // Prompt user for authorization if we don't have auth info.
    const experimentsApiAuth = getExperimentsApiAuth()
    if (!experimentsApiAuth) {
      replaceWithOAuth()
    }
  }

  return (
    <div className='app'>
      <Route {...routeProps} />
    </div>
  )
})

export default App
