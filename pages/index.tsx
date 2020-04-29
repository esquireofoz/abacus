import debugFactory from 'debug'
import React from 'react'

import Layout from '../components/Layout'

import { getExperimentsApiAuth } from '../utils/auth'

import { openAuthPopup } from '../utils/auth'

const debug = debugFactory('abacus:pages/index.tsx')

const IndexPage = React.memo(function IndexPage() {
  debug('IndexPage#render')
  if (typeof window !== 'undefined') {
    const experimentsApiAuth = getExperimentsApiAuth()
    if (!experimentsApiAuth) {
      openAuthPopup()
    }
  }

  return (
    <Layout title='Experiments'>
      <img src='/img/logo.png' width='100' />
      <h1>Experiments</h1>
      <p>Table of experiments to go here.</p>
      <p>Some change to test pre-commit hooks are running.</p>
    </Layout>
  )
})

export default IndexPage
