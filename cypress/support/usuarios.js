Cypress.Commands.add('CadastrarUsuarios', (body , id ="id") => {

  cy.api({
    method: 'POST',
    url: '/usuarios/',
    failOnStatusCode: false,
    body
  })
  .should(({ body }) => {
    Cypress.env(id, body._id)
    console.log(Cypress.env(id))    
  })
})

Cypress.Commands.add('EditarUsuarios', (id,nome,email,senha,admin = "true") => {

  cy.api({
    method: 'PUT',
    url: '/usuarios/' + Cypress.env(id),
    failOnStatusCode: false,    
    body: {
      "nome": nome,
      "email": email,
      "password": senha,
      "administrador": admin
    }
  })
})

Cypress.Commands.add('DeletarUsuarios', (id) => {

  cy.api({
    method: 'DELETE',
    url: '/usuarios/' + Cypress.env(id),
    failOnStatusCode: false,
    headers: {
      authorization: Cypress.env('token')
    },
  })
})

Cypress.Commands.add('ListarUsuarios', (queryParam) => {
  cy.api({
    method: 'GET',
    url: '/usuarios',
    qs:queryParam,
    failOnStatusCode: false,
  })
})
