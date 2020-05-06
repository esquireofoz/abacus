import { render } from '@testing-library/react'
import React from 'react'

import BadComponent from './BadComponent'
import Layout from './Layout'

test('renders layout with declared title and children', () => {
  const { container } = render(<Layout title='Some Title'>A child.</Layout>)

  expect(container).toHaveTextContent('A child.')
  // TODO: Make expectations more thorough.
})

test('renders RenderErrorView when has bad children', () => {
  try {
    // Temporarily turn off the error console.
    jest.spyOn(console, 'error')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ;(console.error as jest.Mock).mockImplementation(() => {})

    const { getByText } = render(
      <Layout title='Some Title'>
        <BadComponent />
      </Layout>,
    )

    // Just checking if it appears the RenderErrorView component was rendered and
    // not testing every little detail. That's what RenderErrorView.text.tsx is for.
    expect(getByText('Oops!')).toBeInTheDocument()
    expect(console.error).toHaveBeenCalled()
  } finally {
    ;(console.error as jest.Mock).mockRestore()
  }
})
