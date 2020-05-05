import type { RenderError } from '@/components/RenderErrorBoundary'

function onAppRenderError(renderError: RenderError) {
  const { error, info } = renderError
  console.error('App Render Error:\n\n', error, info)
}

export { onAppRenderError }
