
Cypress.Commands.add('ListarCarrinhos', (queryParam) => {
  cy.api({
    method: 'GET',
    url: '/carrinhos',
    qs:queryParam,
    failOnStatusCode: false,
  })   
})
 
Cypress.Commands.add('CadastrarCarrinhos', (body) => {

  cy.api({
    method: 'POST',
    url: '/carrinhos',
    failOnStatusCode: false,
    headers:{
      authorization: Cypress.env('token')
    },
    body
  })
})

Cypress.Commands.add('FinalizarCarrinhos', (end) => {

  cy.api({
    method: 'DELETE',
    url: '/carrinhos/' + end,
    failOnStatusCode: false,
    headers:{
      authorization: Cypress.env('token')
    },
  }) 
})