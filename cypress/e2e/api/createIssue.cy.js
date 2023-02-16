import { faker } from '@faker-js/faker'

describe('Cria uma issue via API', () => {

    beforeEach(() => cy.api_deleteProjects())

    it('Sucesso', () => {

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }

        cy.api_createIssue(project, issue)
            .then(response => {

                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(issue.title)
                expect(response.body.description).to.equal(issue.description)
            })
    })
})