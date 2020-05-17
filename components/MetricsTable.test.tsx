import { fireEvent, getAllByText, getByText, render } from '@testing-library/react'
import React from 'react'

import { MetricBare } from '@/models/MetricBare'

import MetricsTable, { PER_PAGE_DEFAULT } from './MetricsTable'

test('with no metrics, renders an empty table', () => {
  const metrics: MetricBare[] = []
  const { container, getByText } = render(<MetricsTable metrics={metrics} />)

  expect(getByText('ID')).toBeInTheDocument()
  expect(getByText('Name')).toBeInTheDocument()
  expect(getByText('Description')).toBeInTheDocument()

  const tBodyElmt = container.querySelector('tbody') as HTMLTableSectionElement
  expect(tBodyElmt).not.toBeNull()
  expect(tBodyElmt.childElementCount).toBe(0)
})

test('with one page of metrics, renders a table', () => {
  const metrics: MetricBare[] = [
    {
      metricId: 1,
      name: 'The name',
      description: 'The description',
    },
  ]
  const { container } = render(<MetricsTable metrics={metrics} />)

  const tBodyElmt = container.querySelector('tbody') as HTMLTableSectionElement
  expect(tBodyElmt).not.toBeNull()
  expect(getByText(tBodyElmt, '1', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getByText(tBodyElmt, 'The name', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getByText(tBodyElmt, 'The description', { selector: 'tr > td' })).toBeInTheDocument()
})

test('with more than one page of metrics, renders a table with a pagination control', () => {
  const COUNT = 40 // Some value greater than "per page"
  const metrics: MetricBare[] = Array.from(Array(COUNT).keys()).map((num) => ({
    metricId: num + 1,
    name: `Name${num + 1}`,
    description: 'The description',
  }))

  const { container } = render(<MetricsTable metrics={metrics} />)

  let tBodyElmt = container.querySelector('tbody') as HTMLTableSectionElement
  expect(tBodyElmt).not.toBeNull()
  expect(getByText(tBodyElmt, '1', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getByText(tBodyElmt, 'Name1', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getAllByText(tBodyElmt, 'The description', { selector: 'tr > td' })).toHaveLength(PER_PAGE_DEFAULT)

  const tFootElmt = container.querySelector('tfoot') as HTMLTableSectionElement
  expect(tFootElmt).not.toBeNull()
  const menuItemElmts = tFootElmt.querySelectorAll<HTMLElement>('tr .item')
  // There should be two direct page buttons and one prev and one next button.
  expect(menuItemElmts.length).toBe(4)

  // The first direct page button should have text '1' and be active.
  expect(getByText(menuItemElmts.item(1), '1', { selector: 'tr .item.active' })).toBeInTheDocument()

  // The second direct page button should have text '2' and not be active.
  expect(getByText(menuItemElmts.item(2), '2', { selector: 'tr .item:not(.active)' })).toBeInTheDocument()

  // Click "next" button
  fireEvent.click(menuItemElmts.item(3))

  // Should be on the second page now.
  tBodyElmt = container.querySelector('tbody') as HTMLTableSectionElement
  expect(tBodyElmt).not.toBeNull()
  expect(getByText(tBodyElmt, '26', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getByText(tBodyElmt, 'Name26', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getAllByText(tBodyElmt, 'The description', { selector: 'tr > td' })).toHaveLength(COUNT - PER_PAGE_DEFAULT)

  // The first direct page button should have text '1' and be not be active.
  expect(getByText(menuItemElmts.item(1), '1', { selector: 'tr .item:not(.active)' })).toBeInTheDocument()

  // The second direct page button should have text '2' and not be active.
  expect(getByText(menuItemElmts.item(2), '2', { selector: 'tr .item.active' })).toBeInTheDocument()

  // Click "page 1" button
  fireEvent.click(menuItemElmts.item(1))

  // Should be back on the first page again.
  tBodyElmt = container.querySelector('tbody') as HTMLTableSectionElement
  expect(tBodyElmt).not.toBeNull()
  expect(getByText(tBodyElmt, '1', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getByText(tBodyElmt, 'Name1', { selector: 'tr > td' })).toBeInTheDocument()
  expect(getAllByText(tBodyElmt, 'The description', { selector: 'tr > td' })).toHaveLength(PER_PAGE_DEFAULT)

  // The first direct page button should have text '1' and be active.
  expect(getByText(menuItemElmts.item(1), '1', { selector: 'tr .item.active' })).toBeInTheDocument()

  // The second direct page button should have text '2' and not be active.
  expect(getByText(menuItemElmts.item(2), '2', { selector: 'tr .item:not(.active)' })).toBeInTheDocument()
})
