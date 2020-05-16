module.exports = {
  globals: {
    // Must specify a custom tsconfig for tests because we need the TypeScript
    // transform to transform JSX into js rather than leaving it as JSX which the
    // next build requires.
    'ts-jest': {
      babelConfig: true,
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['isomorphic-fetch'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).ts?(x)'],
}
