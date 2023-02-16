describe('Verifica logout', () => {

    beforeEach(() => {

        cy.gui_login()
        cy.visit('/')
        cy.gui_logout()
    })

    it('Sucesso', () => {

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
})