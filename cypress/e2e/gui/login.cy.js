describe('Verifica login', () => {

    beforeEach(() => {

        const
            user = Cypress.env('user_name'),
            password = Cypress.env('user_password')

        cy.gui_login(user, password, { cacheSession: false })
    })

    it('Sucesso', () => {

        cy.get('.qa-user-avatar').should('be.visible')
    })
})