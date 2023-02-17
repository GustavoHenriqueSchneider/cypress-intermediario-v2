Cypress.Commands.add('gui_login', (user = Cypress.env('user_name'), password = Cypress.env('user_password'), { cacheSession = true } = {}) => {

    const login = () => {

        cy.visit('/users/sign_in')

        cy.get('#user_login').type(user)
        cy.get('#user_password').type(password, { log: false })

        cy.contains('.login-body input[type=submit]', 'Sign in').click()
    }

    const options = {
        cacheAcrossSpecs: true,
        validate: () => {

            cy.visit('/')
            cy.location('pathname', { timeout: 1000 })
                .should('not.be.equal', '/users/sign_in')
        }
    }

    if (cacheSession)
        cy.session(user, login, options)
    else
        login()
})

Cypress.Commands.add('gui_logout', () => {

    cy.get('a.header-user-dropdown-toggle').click()
    cy.get('a.sign-out-link').click()
})

Cypress.Commands.add('gui_createProject', project => {

    cy.visit('/projects/new')

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/projects/new`)

    cy.get('.gitlab-tabs li')
        .should('have.length', 3)
        .first()
        .click()

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('#project_visibility_level_0').check().should('be.checked')
    cy.get('#project_initialize_with_readme').check().should('be.checked')
    cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', (project, issue) => {

    cy.visit(`/${Cypress.env('user_name')}/${project.name}/issues/new`)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/root/${project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {

    cy.get('a[data-track-property=labels]').click()
    cy.contains('.label-item', label.name).click()
    cy.get('a[data-track-property=labels]').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {

    cy.get('div.milestone a').click()
    cy.contains('div.milestone .dropdown-content a', milestone).click()
})