/* eslint-disable @typescript-eslint/unbound-method */
import {
  acceptMessagesFrom,
  getExperimentsApiAuth,
  replaceWithAuthPage,
  replaceWithOAuth,
  saveExperimentsApiAuth,
} from './auth'

function createMockLocation(overrides?: object) {
  return {
    ancestorOrigins: { contains: jest.fn(), item: jest.fn(), length: 0, [Symbol.iterator]: jest.fn() },
    assign: jest.fn(),
    hash: '',
    href: 'http://localhost',
    host: 'http://localhost',
    hostname: 'localhost',
    origin: 'http://localhost',
    pathname: '',
    port: '3000',
    protocol: 'http',
    reload: jest.fn(),
    replace: jest.fn(),
    search: '',
    ...overrides,
  }
}

describe('utils/auth.ts module', () => {
  const { location } = window

  beforeAll(() => {
    delete window.location
  })

  afterAll(() => {
    window.location = location
  })

  beforeEach(() => {
    window.location = createMockLocation()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  describe('acceptMessagesFrom', () => {
    it('should accept a8c-abacus-local:3000, https://experiments.a8c.com, and localhost', () => {
      expect(acceptMessagesFrom('http://a8c-abacus-local:3000')).toBe(true)
      expect(acceptMessagesFrom('https://a8c-abacus-local:3000')).toBe(true)
      expect(acceptMessagesFrom('https://experiments.a8c.com')).toBe(true)
      expect(acceptMessagesFrom('http://localhost')).toBe(true)
      expect(acceptMessagesFrom('http://localhost:3000')).toBe(true)
      expect(acceptMessagesFrom('http://localhost:8888')).toBe(true)
      expect(acceptMessagesFrom('https://localhost')).toBe(true)
      expect(acceptMessagesFrom('https://localhost:3000')).toBe(true)
      expect(acceptMessagesFrom('https://localhost:8888')).toBe(true)
    })

    it('should accept not a8c-abacus-local:8888, http://experiments.a8c.com, and many others', () => {
      expect(acceptMessagesFrom('http://a8c-abacus-local:8888')).toBe(false)
      expect(acceptMessagesFrom('https://a8c-abacus-local:8888')).toBe(false)
      expect(acceptMessagesFrom('http://experiments.a8c.com')).toBe(false)
      expect(acceptMessagesFrom('https://google.com/')).toBe(false)
      expect(acceptMessagesFrom('http://localhost.com')).toBe(false)
    })
  })

  describe('getExperimentsApiAuth', () => {
    it('should initially return `null` but can later retrieve value set with `saveExperimentsApiAuth`', () => {
      expect(getExperimentsApiAuth()).toBe(null)

      const expiresAt = Date.now() + 24 * 60 * 60 * 1000
      saveExperimentsApiAuth({
        accessToken: 'abunchofcharactersthatlookrandom',
        expiresAt,
        scope: 'global',
        type: 'token',
      })

      expect(getExperimentsApiAuth()).toEqual({
        accessToken: 'abunchofcharactersthatlookrandom',
        expiresAt,
        scope: 'global',
        type: 'token',
      })
    })
  })

  describe('saveExperimentsApiAuth', () => {
    it('called with null should remove localStorage item', () => {
      expect(localStorage.getItem('experiments_api_auth')).toBe(null)

      const expiresAt = Date.now() + 24 * 60 * 60 * 1000
      saveExperimentsApiAuth({
        accessToken: 'abunchofcharactersthatlookrandom',
        expiresAt,
        scope: 'global',
        type: 'token',
      })

      expect(getExperimentsApiAuth()).toEqual({
        accessToken: 'abunchofcharactersthatlookrandom',
        expiresAt,
        scope: 'global',
        type: 'token',
      })

      saveExperimentsApiAuth(null)

      expect(localStorage.getItem('experiments_api_auth')).toBe(null)
    })
  })

  describe('replaceWithAuthPage', () => {
    it('should return void when called and call window.location.replace with expected URL', () => {
      expect(replaceWithAuthPage()).toBeUndefined()
      expect(window.location.replace).toHaveBeenCalledWith('http://localhost/auth')
    })
  })

  describe('replaceWithOAuth', () => {
    it('should return void when called and call window.location.replace with expected URL', () => {
      expect(replaceWithOAuth()).toBeUndefined()
      expect(window.location.replace).toHaveBeenCalledWith(
        'https://public-api.wordpress.com/oauth2/authorize?client_id=68797&redirect_uri=http%3A%2F%2Flocalhost%2Fauth&response_type=token&scope=global',
      )

      window.location = createMockLocation({
        href: 'https://experiments.a8c.com',
        host: 'experiments.a8c.com',
        hostname: 'experiments.a8c.com',
        origin: 'https://experiments.a8c.com',
        port: '80',
        protocol: 'https',
      })

      expect(replaceWithOAuth()).toBeUndefined()
      expect(window.location.replace).toHaveBeenCalledWith(
        'https://public-api.wordpress.com/oauth2/authorize?client_id=68795&redirect_uri=https%3A%2F%2Fexperiments.a8c.com%2Fauth&response_type=token&scope=global',
      )
    })
  })
})
