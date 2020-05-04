const path = require('path')

module.exports = {
  addons: ['@storybook/preset-scss', '@storybook/preset-typescript'],
  stories: ['../**/*.stories.tsx'],
  webpackFinal: async (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            configFile: path.join(__dirname, '..', 'tsconfig.storybook.json'),
          },
        },
      ],
    })

    if (!webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias = {}
    }

    webpackConfig.resolve.alias['@'] = path.join(__dirname, '..')
    webpackConfig.resolve.extensions.push('.ts', '.tsx')

    return webpackConfig
  },
}
