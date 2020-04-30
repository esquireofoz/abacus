import debugFactory from 'debug'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'

import { acceptMessagesFrom, saveExperimentsApiAuth } from '../utils/auth'

const debug = debugFactory('abacus:pages/_app.tsx')

interface WindowOpener {
  close: () => void
  name: string
}

const App = React.memo(function App(props: AppProps) {
  debug('App#render')
  const { Component: Route, pageProps: routeProps } = props

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', (event) => {
        const { data, origin, source } = event
        debug('App#render#onMessage')

        if (acceptMessagesFrom(origin)) {
          if (data.action === 'experiments_api_authorized') {
            const experimentsApiAuth = data.data
            saveExperimentsApiAuth(experimentsApiAuth)
            const opener: WindowOpener = source as WindowOpener
            if (opener && opener.name === 'auth') {
              opener.close()
            }
          }
        }
      })
    }
  }, [])

  return (
    <div className='app'>
      <Route {...routeProps} />
    </div>
  )
})

export default App
