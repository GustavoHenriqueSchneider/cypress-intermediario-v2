import { faker } from '@faker-js/faker'

describe('Cria e insere label numa issue', () => {

    beforeEach(() => {

        cy.api_deleteProjects()
        cy.gui_login()

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.wrap(project).as('project')

        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }

        cy.wrap(issue).as('issue')

        const label = {
            name: `label-${faker.random.word()}`,
            color: '#ffaabb'
        }

        cy.wrap(label).as('label')

        cy.api_createIssue(project, issue)
            .then(response => {

                cy.api_createLabel(response.body.project_id, label)

                cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/${response.body.iid}`)
            })
    })

    it('Sucesso', () => {

        cy.get('@label')
            .then(label => {

                cy.gui_setLabelOnIssue(label)

                cy.get('.qa-labels-block')
                    .should('contain', label.name)

                cy.get('.qa-labels-block span')
                    .should('include.attr', 'style', `background-color: ${label.color}; color: #333333;`)
            })
    })
})