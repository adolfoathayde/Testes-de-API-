describe('Listar produtos cadastrados', () => {
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoProduto } = require('../../fixtures/produtos.factory');

  before('criar produto', () => {
    cy.CadastrarUsuarios(novoUsuario())
    cy.LoginAleatorio()
    cy.CadastrarProdutos(novoProduto())
  })

  it('listar todos os produtos', () => {
    cy.ListarProdutos()
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('busca por ID', () => {
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0]._id
        const queryParam = { _id: produto }
        cy.ListarProdutos(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })

  it('busca por nome', () => {
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0].nome
        const queryParam = { nome: produto }
        cy.ListarProdutos(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })

  it('busca por preço', () => {
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0].preco
        const queryParam = { preco: produto }
        cy.ListarProdutos(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })

  it('busca por descrição', () => {
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0].descricao
        const queryParam = { descricao: produto }
        cy.ListarProdutos(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })

  it('busca por quantidade', () => {
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0].quantidade
        const queryParam = { quantidade : produto }
        cy.ListarProdutos(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })

  it('Produto não encontrado', () => {
    const queryParam = { quantidade: 999999999999999 }
    cy.ListarProdutos(queryParam)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.equal(0)
      })
  })
})