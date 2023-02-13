describe('Excluir produto', () => {
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoProduto } = require('../../fixtures/produtos.factory');
  const { novoCarrinho } = require('../../fixtures/carrinhos.factory');

  it('Token ausente, inválido ou expirado', () => {
    cy.DeletarProdutos()
      .should(({ status, body }) => {
        expect(status).to.equal(401)
        expect(body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })

  it('excluir produto por ID', () => {
    const setProduto = novoProduto()
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(setProduto)
    cy.DeletarProdutos("id")
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Registro excluído com sucesso')
      })
  })

  it('nenhum registro excluído', () => {
    const setProduto = novoProduto()
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(setProduto)
    cy.DeletarProdutos("idNaoDefinido")
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Nenhum registro excluído')
      })
  })

  it('produto faz parte de carrinho', () => {
    const setBody = novoUsuario("true")
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email, setBody.password)
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0]._id
        cy.CadastrarCarrinhos(novoCarrinho(produto))
        cy.DeletarProdutosComCarrinho(produto)
          .should(({ status, body }) => {
            expect(status).to.equal(400)
            expect(body.message).to.equal('Não é permitido excluir produto que faz parte de carrinho')
          })
      })
  })

  it('Rota exclusiva para administradores', () => {
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(novoUsuario())
    cy.LoginAleatorio()
    cy.DeletarProdutos(setProduto)
      .should(({ status, body }) => {
        expect(status).to.equal(403)
        expect(body.message).to.equal('Rota exclusiva para administradores')
      })
  })

})





