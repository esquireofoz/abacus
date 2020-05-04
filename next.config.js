const path = require('path')

const nextBundleAnalyzer = require('@next/bundle-analyzer')

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextJsConfig = {
  webpack: (webpackConfig, webpackDefaults) => {
    webpackConfig.resolve.alias['@'] = path.join(__dirname)

    return webpackConfig
  },
}

module.exports = withBundleAnalyzer(nextJsConfig)
