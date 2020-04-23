describe('Index page', () => {

  beforeEach(() => {
    cy.log('Visiting http://localhost:3000')
    cy.visit('/')
  })

  it('should have a logo', () => {
    cy.get('img').should('have.length', 1)
  })

})
