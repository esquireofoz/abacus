import debugFactory from 'debug'
import React, { useEffect, useState } from 'react'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'

import MetricsApi from '@/api/MetricsApi'

import ErrorsBox from '@/components/ErrorsBox'
import Layout from '@/components/Layout'
import MetricsTable from '@/components/MetricsTable'

import { MetricBare } from '@/models/index'

const debug = debugFactory('abacus:pages/metrics.tsx')

const MetricsPage = function MetricsPage() {
  debug('MetricsPage#render')
  const [error, setError] = useState<Error | null>(null)
  const [metrics, setMetrics] = useState<MetricBare[] | null>(null)

  useEffect(() => {
    MetricsApi.findAll()
      .then((metrics) => setMetrics(metrics))
      .catch(setError)
  }, [])

  return (
    <Layout title='Metrics'>
      <Container>
        <img src='/img/logo.png' width='100' />
        <h1>Metrics</h1>
        {error && <ErrorsBox errors={[error]} />}
        {metrics && <>{metrics.length === 0 ? <p>No metrics yet.</p> : <MetricsTable metrics={metrics} />}</>}
      </Container>
    </Layout>
  )
}

export default MetricsPage
