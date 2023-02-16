import { faker } from '@faker-js/faker'

describe('Cria uma issue', () => {

    beforeEach(() => {

        cy.api_deleteProjects()
        cy.gui_login()

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.wrap(project).as('project')

        cy.api_createProject(project)
    })

    it('Sucesso', () => {

        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }

        cy.get('@project').then(project => {

            cy.gui_createIssue(project, issue)
        })

        cy.get('.detail-page-description')
            .should('include.text', issue.title)
            .and('include.text', issue.description)
    })
})