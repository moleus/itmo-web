describe('Client authentication cases', function () {
    it('redirects to /login', () => {
        cy.visit('/')
        cy.location('href').should('match', /login.jsp$/)
    })
})
