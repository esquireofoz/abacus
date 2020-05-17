import debugFactory from 'debug'
import { toInt } from 'qc-to_int'
import React, { MouseEvent, useState } from 'react'

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table'

import { MetricBare } from '@/models/index'

const debug = debugFactory('abacus:components/MetricsTable.tsx')

const PER_PAGE_DEFAULT = 25

interface Props {
  metrics: MetricBare[]
  // The zero-based page of data to display. Defaults to 0.
  initialPage?: number
  // The number of rows/items to display per page. Defaults to PER_PAGE_DEFAULT.
  perPage?: number
}

/**
 * Renders a table of "bare" experiment information.
 */
const MetricsTable = (props: Props) => {
  debug('MetricsTable#render')
  const { metrics, initialPage = 0, perPage = PER_PAGE_DEFAULT } = props
  const [page, setPage] = useState(initialPage)

  const pageCount = Math.ceil(metrics.length / perPage)
  const pageNums = Array.from(Array(pageCount).keys()).map((num) => num + 1)

  function handlePageStep(event: MouseEvent<HTMLAnchorElement>) {
    debug('MetricsTable#handlePageStep')
    event.preventDefault()
    event.stopPropagation()
    setPage(page + toInt(event.currentTarget.dataset.step))
  }

  function handleSetPage(event: MouseEvent<HTMLAnchorElement>) {
    debug('MetricsTable#handleSetPage')
    event.preventDefault()
    event.stopPropagation()
    setPage(toInt(event.currentTarget.dataset.page))
  }

  const beginIdx = perPage * page
  const endIdx = beginIdx + perPage
  const metricsToRender = metrics.slice(beginIdx, endIdx)
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {metricsToRender.map((experiment) => (
          <React.Fragment key={experiment.metricId}>
            <Table.Row>
              <Table.Cell>{experiment.metricId}</Table.Cell>
              <Table.Cell>{experiment.name}</Table.Cell>
              <Table.Cell>{experiment.description}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
      {pageCount > 1 && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item
                  data-step={-1}
                  disabled={page <= 0}
                  icon='chevron left'
                  onClick={handlePageStep}
                  role='button'
                />
                {pageNums.map((num) => (
                  <Menu.Item
                    key={num}
                    active={page === num - 1}
                    content={num}
                    data-page={num - 1}
                    onClick={handleSetPage}
                    role='button'
                  />
                ))}
                <Menu.Item
                  data-step={1}
                  disabled={page + 1 >= pageCount}
                  icon='chevron right'
                  onClick={handlePageStep}
                  role='button'
                />
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  )
}

export { PER_PAGE_DEFAULT }
export default MetricsTable
