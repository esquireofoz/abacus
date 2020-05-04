import debugFactory from 'debug'
import React from 'react'

import Layout from '@/components/Layout'

const debug = debugFactory('abacus:pages/index.tsx')

const IndexPage = function IndexPage() {
  debug('IndexPage#render')
  return (
    <Layout title='Experiments'>
      <img src='/img/logo.png' width='100' />
      <h1>Experiments</h1>
      <p>Table of experiments to go here.</p>
      <p>Some change to test pre-commit hooks are running.</p>
    </Layout>
  )
}

export default IndexPage
