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
    function onMessage(event: MessageEvent) {
      debug('App#render#onMessage')
      const { data, origin, source } = event

      if (acceptMessagesFrom(origin)) {
        switch (data.action) {
          case 'abacus_access_authorized':
            {
              const experimentsApiAuth = data.data
              saveExperimentsApiAuth(experimentsApiAuth)
              const opener: WindowOpener = source as WindowOpener
              if (opener && opener.name === 'auth') {
                opener.close()
              }
            }
            break
          case 'abacus_access_denied':
            saveExperimentsApiAuth(null)
            break
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('message', onMessage)
      return () => {
        window.removeEventListener('message', onMessage)
      }
    }
  }, [])

  return (
    <div className='app'>
      <Route {...routeProps} />
    </div>
  )
})

export default App
