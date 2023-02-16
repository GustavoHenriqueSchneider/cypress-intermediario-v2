import { faker } from '@faker-js/faker'

describe('Cria um projeto', () => {

    beforeEach(() => {

        cy.api_deleteProjects()
        cy.gui_login()
    })

    it('Sucesso', () => {

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.gui_createProject(project)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)

        cy.get('.flash-notice').should('include.text', project.name)
        cy.get('.project-home-panel h1').should('include.text', project.name)
        cy.get('.project-home-panel .home-panel-description').should('include.text', project.description)
    })
})