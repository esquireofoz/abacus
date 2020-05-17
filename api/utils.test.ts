import { DEVELOPMENT_API_URL_ROOT, PRODUCTION_API_URL_ROOT, resolveApiUrlRoot } from './utils'

describe('api/utils.ts module', () => {
  describe('resolveApiUrlRoot', () => {
    it('called in production should resolve to the production API URL root', () => {
      Object.defineProperty(window, 'location', {
        value: new URL('https://experiments.a8c.com/'),
        writable: true,
      })
      expect(resolveApiUrlRoot()).toBe(PRODUCTION_API_URL_ROOT)
    })

    it('called while not in production should resolve to the development API URL root', () => {
      Object.defineProperty(window, 'location', {
        value: new URL('http://abacus-local:3000/'),
        writable: true,
      })
      expect(resolveApiUrlRoot()).toBe(DEVELOPMENT_API_URL_ROOT)
    })
  })
})
