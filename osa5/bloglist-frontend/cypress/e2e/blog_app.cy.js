describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root',
      password: 'root123',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('root123')
      cy.get('#login-button').click()

      cy.contains('Logged in!')
    })

    it('Fails with incorrect credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong123')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'root',
        password: 'root123',
      }).then((response) => {
        localStorage.setItem(
          'currentlyLoggedUser',
          JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3000')
      })
    })

    it('A new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title-input').type('Cypress Testing')
      cy.get('#author-input').type('Testuser')
      cy.get('#url-input').type('http://localhost:3000')
      cy.contains('Add new blog').click()

      cy.contains('Added a new blog: Cypress Testing by Testuser')
      cy.get('.blog').contains('Cypress Testing by Testuser')
    })
  })
})
