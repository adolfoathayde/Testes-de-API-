describe('Remover usuario', () => {
  const faker = require('faker-br');
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoCarrinho } = require('../../fixtures/carrinhos.factory');

  it('Registro excluído com sucesso', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.DeletarUsuarios('id')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Registro excluído com sucesso')
      })
  })

  it('Nenhum registro excluído', () => {
    cy.DeletarUsuarios("id")
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.usuarios).to.not.equal('Nenhum registro excluído')
      })
  })

  it.only('Usuário com carrinho cadastrado', () => {
    const setBody = novoUsuario() 
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email, setBody.password)
    cy.ListarProdutos()
      .then(listaProd => {
        const produto = listaProd.body.produtos[0]._id
        cy.CadastrarCarrinhos(novoCarrinho(produto))
        cy.DeletarUsuarios('id')
          .should(({ status, body }) => {
            expect(status).to.equal(400)
            expect(body.usuarios).to.not.equal('Não é permitido excluir usuário com carrinho cadastrado')
          })
      })
  })
})