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
      cy.login({ username: 'root', password: 'root123' })
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

    describe('An existing blog', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'Cypress Testing',
          author: 'Testuser',
          url: 'http://localhost:3000',
          likes: 30,
        })
      })

      it('Can be liked', function () {
        cy.get('.blog').contains('Cypress Testing by Testuser').click()
        cy.contains('Likes: 30')
        cy.get('#like-button').click()
        cy.contains('Likes: 31')
      })

      it('Can be deleted by the correct user', function () {
        cy.get('.blog').contains('Cypress Testing by Testuser').click()
        cy.get('.deleteButton').click()
        cy.contains('Removed blog: Cypress Testing by Testuser')
        cy.get('.blog').should('not.exist')
      })

      it('does not have delete button visible for anyone but the creator', function () {
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'user',
          password: 'user123',
        })
        cy.get('#logout-button').click
        cy.login({ username: 'user', password: 'user123' })
        cy.get('.blog').click()
        cy.get('.deleteButton').should('not.exist')
      })
    })

    describe('Multiple blogs', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'Second',
          author: 'Root',
          url: 'http://localhost:3003/api/users',
          likes: '6',
        })
        cy.addBlog({
          title: 'Third',
          author: 'User',
          url: 'http://localhost:3003/api/login',
          likes: '5',
        })
        cy.addBlog({
          title: 'First',
          author: 'Many Likes',
          url: 'http://localhost:3003/api/blogs',
          likes: '7',
        })
      })
      it('Are sorted by likes', function () {
        // check for initial order
        cy.get('.blog').eq(0).should('contain', 'First')
        cy.get('.blog').eq(1).should('contain', 'Second')
        cy.get('.blog').eq(2).should('contain', 'Third')

        // like Second twice to make it the most liked
        cy.contains('Second').click()
        cy.get('#like-button').as('likeSecond')
        cy.get('@likeSecond').click()
        cy.contains('Likes: 7')
        cy.get('@likeSecond').click()
        cy.contains('Likes: 8')

        // check if the order has updated
        cy.get('.blog').eq(0).should('contain', 'Second')
        cy.get('.blog').eq(1).should('contain', 'First')
        cy.get('.blog').eq(2).should('contain', 'Third')
      })
    })
  })
})
