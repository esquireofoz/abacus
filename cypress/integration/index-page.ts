// Note: This empty import is used to turn this file into a module so that
// TypeScript does not issue an error about `compilerOptions.isolatedModules` is
// true.
export {}

describe('Index page', () => {
  beforeEach(() => {
    cy.log('Visiting http://localhost:3000')
    cy.visit('/')
  })

  it('should have a logo', () => {
    cy.get('img').should('have.length', 1)
  })

  it('should have a page title', () => {
    cy.get('h1').findByText('Experiments').should('exist')
  })
})
