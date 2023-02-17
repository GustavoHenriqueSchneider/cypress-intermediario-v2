import { faker } from '@faker-js/faker'

describe('Cria e insere um milestone numa issue', () => {

    beforeEach(() => {

        cy.api_deleteProjects()
        cy.gui_login()

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }

        const milestone = faker.random.word()

        cy.wrap(project).as('project')
        cy.wrap(issue).as('issue')
        cy.wrap(milestone).as('milestone')

        cy.api_createIssue(project, issue)
            .then(response => {

                cy.api_createMilestone(response.body.project_id, milestone)

                cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/${response.body.iid}`)
            })
    })

    it('Sucesso', () => {

        cy.get('@milestone')
            .then(milestone => {

                cy.gui_setMilestoneOnIssue(milestone)
                cy.get('div.milestone .value').should('have.text', milestone)
            })
    })
})