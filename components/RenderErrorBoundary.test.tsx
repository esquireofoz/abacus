import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import BadComponent from './BadComponent'
import RenderErrorBoundary from './RenderErrorBoundary'

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

test('RenderErrorBoundary called without `onClear` or `onError` passes render prop an argument object with a `renderError` property with an error, info, and a clear function when render prop errors', () => {
  try {
    // Temporarily turn off the error console.
    jest.spyOn(console, 'error')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ;(console.error as jest.Mock).mockImplementation(() => {})

    const mockRenderProp = jest.fn(({ renderError }) => {
      return (
        <>
          {renderError === null ? (
            <BadComponent />
          ) : (
            <>
              <p>Oh no! Not again!</p>
              <button onClick={renderError.clear}>Clear</button>
            </>
          )}
        </>
      )
    })

    const { container, getByText } = render(<RenderErrorBoundary>{mockRenderProp}</RenderErrorBoundary>)

    const error = expect.any(Error)
    const info = expect.any(Object)
    const clear = expect.any(Function)

    expect(mockRenderProp).toHaveBeenCalledTimes(2)
    expect(mockRenderProp).toHaveBeenNthCalledWith(1, { renderError: null })
    expect(mockRenderProp).toHaveBeenNthCalledWith(2, { renderError: { clear, error, info } })
    expect(container).toHaveTextContent('Oh no! Not again!')

    fireEvent.click(getByText('Clear'))

    expect(mockRenderProp).toHaveBeenCalledTimes(4)
    expect(mockRenderProp).toHaveBeenNthCalledWith(3, { renderError: null })
    expect(mockRenderProp).toHaveBeenNthCalledWith(4, { renderError: { clear, error, info } })
  } finally {
    ;(console.error as jest.Mock).mockRestore()
  }
})

test('RenderErrorBoundary called with `onClear` or `onError` passes render prop an argument object with a `renderError` property with an error, info, and a clear function when render prop errors', () => {
  try {
    // Temporarily turn off the error console.
    jest.spyOn(console, 'error')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ;(console.error as jest.Mock).mockImplementation(() => {})

    const mockRenderProp = jest.fn(({ renderError }) => {
      return (
        <>
          {renderError === null ? (
            <BadComponent />
          ) : (
            <>
              <p>Oh no! Not again!</p>
              <button onClick={renderError.clear}>Clear</button>
            </>
          )}
        </>
      )
    })

    const onClear = jest.fn()
    const onError = jest.fn()
    const { container, getByText } = render(
      <RenderErrorBoundary onClear={onClear} onError={onError}>
        {mockRenderProp}
      </RenderErrorBoundary>,
    )

    const error = expect.any(Error)
    const info = expect.any(Object)
    const clear = expect.any(Function)

    expect(onClear).toHaveBeenCalledTimes(0)

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenNthCalledWith(1, { clear, error, info })

    expect(mockRenderProp).toHaveBeenCalledTimes(2)
    expect(mockRenderProp).toHaveBeenNthCalledWith(1, { renderError: null })
    expect(mockRenderProp).toHaveBeenNthCalledWith(2, { renderError: { clear, error, info } })
    expect(container).toHaveTextContent('Oh no! Not again!')

    fireEvent.click(getByText('Clear'))

    expect(onClear).toHaveBeenCalledTimes(1)

    expect(onError).toHaveBeenCalledTimes(2)
    expect(onError).toHaveBeenNthCalledWith(2, { clear, error, info })

    expect(mockRenderProp).toHaveBeenCalledTimes(4)
    expect(mockRenderProp).toHaveBeenNthCalledWith(3, { renderError: null })
    expect(mockRenderProp).toHaveBeenNthCalledWith(4, { renderError: { clear, error, info } })
  } finally {
    ;(console.error as jest.Mock).mockRestore()
  }
})
