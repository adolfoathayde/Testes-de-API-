
Cypress.Commands.add('Login', (email, senha, token = "token") => {

  cy.api({
    method: 'POST',
    url: '/login',
    failOnStatusCode: false,
    body: {
      "email": email,
      "password": senha
    }
  })
    .should(({ body }) => {
      Cypress.env(token, body.authorization)
      console.log(Cypress.env(token))
    })
})

Cypress.Commands.add('LoginAleatorio', (admin = "false") => {
  cy.ListarUsuarios('')
    .then(({ body }) => {
      const foundUsuario = body.usuarios.find(usuario => usuario.administrador == admin)
      console.log(body.usuarios)
      console.log(foundUsuario)
      cy.Login(foundUsuario.email, foundUsuario.password)
    })
})

