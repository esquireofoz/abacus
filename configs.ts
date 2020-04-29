const configs = {
  api: {
    rest: {
      experiments: {
        url: {
          origin: process.env.EXPERIMENTS_REST_API_URL_ORIGIN,
          pathRoot: process.env.EXPERIMENTS_REST_API_URL_PATH_ROOT,
        },
      },
    },
  },
}

export default configs
