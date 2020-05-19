import isSnakeCase from './isSnakeCase'

describe('utils/isSnakeCase.ts module', () => {
  describe('isSnakeCase', () => {
    it('should return false if not given a string', () => {
      expect(isSnakeCase(undefined)).toBe(false)
      expect(isSnakeCase(null)).toBe(false)
      expect(isSnakeCase(false)).toBe(false)
      expect(isSnakeCase(true)).toBe(false)
      expect(isSnakeCase({})).toBe(false)
    })

    it('should return false if string is empty', () => {
      expect(isSnakeCase('')).toBe(false)
    })

    it('should return false if string begins with an underscore', () => {
      expect(isSnakeCase('_foo')).toBe(false)
    })

    it('should return false if string ends with an underscore', () => {
      expect(isSnakeCase('foo_')).toBe(false)
    })

    it('should return false if string contains consecutive underscores', () => {
      expect(isSnakeCase('foo__bar')).toBe(false)
    })

    it('should return false if string contains uppercase letters', () => {
      expect(isSnakeCase('Foo_Bar')).toBe(false)
    })

    it('should return true if string is valid snake_case', () => {
      expect(isSnakeCase('foo')).toBe(true)
      expect(isSnakeCase('00')).toBe(true)
      expect(isSnakeCase('foo_bar')).toBe(true)
      expect(isSnakeCase('foo_bar_quux_corge')).toBe(true)
      expect(isSnakeCase('0_0')).toBe(true)
      expect(isSnakeCase('00')).toBe(true)
    })
  })
})
