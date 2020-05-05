import { render } from '@testing-library/react'
import React from 'react'

import RenderErrorBoundary from './RenderErrorBoundary'

const obj = {}

function BadComponent() {
  // Need a component that will fail when React attempts to render but also need
  // something that TypeScript will compile. The type assertion allows TS to
  // compile successfully but because we essentially lied to TS, it will fail as
  // runtime.
  return <>{(obj as { nonExistent: { boom: 'shaka laka' } }).nonExistent.boom}</>
}

test('renders error boundary with declared render prop when render prop does not error', () => {
  const { container } = render(<RenderErrorBoundary>{() => <>A child.</>}</RenderErrorBoundary>)

  expect(container).toHaveTextContent('A child.')
})

test('passes render prop an argument object with a null `renderError` property when render prop does not error', () => {
  const mockRenderProp = jest.fn(() => <>A child.</>)
  const { container } = render(<RenderErrorBoundary>{mockRenderProp}</RenderErrorBoundary>)

  expect(mockRenderProp).toHaveBeenCalledTimes(1)
  expect(mockRenderProp).toHaveBeenCalledWith({ renderError: null })
  expect(container).toHaveTextContent('A child.')
})

test('passes render prop an argument object with a `renderError` property with an error, info, and a clear function when render prop errors', () => {
  try {
    // Temporarily turn off the error console.
    jest.spyOn(console, 'error')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ;(console.error as jest.Mock).mockImplementation(() => {})
    const mockRenderProp = jest.fn(({ renderError }) => {
      return <>{renderError === null ? <BadComponent /> : <p>Oh no! Not again!</p>}</>
    })

    const { container } = render(<RenderErrorBoundary>{mockRenderProp}</RenderErrorBoundary>)

    const error = expect.any(Error)
    const info = expect.any(Object)
    const clear = expect.any(Function)

    expect(mockRenderProp).toHaveBeenCalledTimes(2)
    expect(mockRenderProp).toHaveBeenNthCalledWith(1, { renderError: null })
    expect(mockRenderProp).toHaveBeenNthCalledWith(2, { renderError: { clear, error, info } })
    expect(container).toHaveTextContent('Oh no! Not again!')
  } finally {
    ;(console.error as jest.Mock).mockRestore()
  }
})
