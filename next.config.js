const nextBundleAnalyzer = require('@next/bundle-analyzer')

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})
