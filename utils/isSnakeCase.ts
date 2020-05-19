import { typeOf } from 'qc-type_of'

const SNAKE_CASE_RE = /^[a-z0-9]+(:?_[a-z0-9]+)*$/

/**
 * Determines whether the value given is in snake_case.
 */
function isSnakeCase(value: unknown): boolean {
  let matches = false
  if (typeOf(value) === 'string') {
    const input = value as string
    matches = !input.includes('__')
    matches = matches && SNAKE_CASE_RE.test(input)
  }
  return matches
}

export default isSnakeCase
