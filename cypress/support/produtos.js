Cypress.Commands.add('EditarProdutos', (nome, preco, descricao, quantidade) => {

  cy.api({
    method: 'PUT',
    url: '/produtos/' + Cypress.env('id'),
    failOnStatusCode: false,
    headers: {
      authorization: Cypress.env('token')
    },
    body: {
      "nome": nome,
      "preco": preco,
      "descricao": descricao,
      "quantidade": quantidade,
    }
  })
})

Cypress.Commands.add('CadastrarProdutos', (body , id ="id") => {

  cy.api({
    method: 'POST',
    url: '/produtos',
    failOnStatusCode: false,
    headers: {
      authorization: Cypress.env('token')
    },
    body
  })
  .should(({ body }) => {
    Cypress.env(id, body._id)
    console.log(Cypress.env(id))
  })
})

Cypress.Commands.add('DeletarProdutos', (id ="id") => {

  cy.api({
    method: 'DELETE',
    url: '/produtos/' + Cypress.env(id),
    failOnStatusCode: false,
    headers: {
      authorization: Cypress.env('token')
    },
  })
})

Cypress.Commands.add('DeletarProdutosComCarrinho', (id ="id") => {

  cy.api({
    method: 'DELETE',
    url: '/produtos/' + id,
    failOnStatusCode: false,
    headers: {
      authorization: Cypress.env('token')
    },
  })
})

Cypress.Commands.add('ListarProdutos', (queryParam) => {
  cy.api({
    method: 'GET',
    url: '/produtos',
    qs:queryParam,
    failOnStatusCode: false,
  })
})

// // Cypress.Commands.add('ListarProdutoId', (id) => {
// //   cy.api({
// //     method: 'GET',
// //     url:"/produtos/" + Cypress.env(id),
// //     failOnStatusCode: false,
// //   })
// // })

// Cypress.Commands.add('ProdutoAleatorio', (id ="id", nome="nome", preco='preco', descricao="descricao", quantidade="quantidade" ) => {

//   cy.ListarProdutos('')
//     .then(({ body }) => {
//       Cypress.env(id, body.produtos[0]._id)
//       Cypress.env(nome, body.produtos[0].nome)
//       Cypress.env(preco, body.produtos[0].preco)
//       Cypress.env(descricao, body.produtos[0].descricao) 
//       Cypress.env(quantidade, body.produtos[0].quantidade) 
//       const IDREAL = Cypress.env(id)
//       console.log(IDREAL)

//       // console.log(Cypress.env(id))
//       // console.log(Cypress.env(nome))
//       // console.log(Cypress.env(preco))
//       // console.log(Cypress.env(descricao))
//       // console.log(Cypress.env(quantidade))
//     })
// })