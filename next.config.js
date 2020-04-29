require('dotenv').config()
const nextBundleAnalyzer = require('@next/bundle-analyzer')

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextJsConfig = {
  env: {
    EXPERIMENTS_REST_API_URL_ORIGIN: process.env.EXPERIMENTS_REST_API_URL_ORIGIN,
    EXPERIMENTS_REST_API_URL_PATH_ROOT: process.env.EXPERIMENTS_REST_API_URL_PATH_ROOT,
  },
}

module.exports = withBundleAnalyzer(nextJsConfig)
