const DEVELOPMENT_API_URL_ROOT = 'https://virtserver.swaggerhub.com/yanir/experiments/0.1.0'
const PRODUCTION_API_URL_ROOT = 'https://public-api.wordpress.com/wpcom/v2/experiments/0.1.0'

function resolveApiUrlRoot() {
  return window.location.host === 'experiments.a8c.com' ? PRODUCTION_API_URL_ROOT : DEVELOPMENT_API_URL_ROOT
}

export { DEVELOPMENT_API_URL_ROOT, PRODUCTION_API_URL_ROOT, resolveApiUrlRoot }
