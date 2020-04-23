module.exports = {
  globals: {
    // Must specify a custom tsconfig for tests because we need the TypeScript
    // transform to transform JSX into js rather than leaving it as JSX which the
    // next build requires.
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
