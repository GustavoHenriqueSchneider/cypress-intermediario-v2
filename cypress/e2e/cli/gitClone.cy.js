import { faker } from '@faker-js/faker'

describe('Clona um projeto', () => {

    beforeEach(() => {

        cy.api_deleteProjects()

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }

        cy.wrap(project).as('project')

        cy.api_createProject(project)
    })

    it('Sucesso', () => {

        cy.get('@project')
            .then(project => {

                cy.cli_cloneViaSSH(project)

                cy.readFile(`cypress/downloads/${project.name}/README.md`)
                    .should('contain', `# ${project.name}`)
                    .and('contain', project.description)
            })
    })
})