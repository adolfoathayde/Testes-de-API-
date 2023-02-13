describe('Concluir Carrinho de Compra', () => {
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoCarrinho, novoCarrinhoDobrado } = require('../../fixtures/carrinhos.factory');
  
  it('falta de credenciais', () => {
    cy.FinalizarCarrinhos('concluir-compra')
    .should(({ status, body }) => {
      expect(status).to.equal(401)
      expect(body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  }) 

  it('excluir carrinho e dar baixa no estoque', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.CadastrarCarrinhos(novoCarrinho())  
    cy.FinalizarCarrinhos('concluir-compra')
    .should(({ status, body }) => {
      expect(status).to.equal(200)
      expect(body.message).to.equal('Registro excluído com sucesso')
    }) 
  })

  it('carrinho não encontrado', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.FinalizarCarrinhos('concluir-compra')
    .should(({ status, body }) => {
      expect(status).to.equal(200)
      expect(body.message).to.equal('Não foi encontrado carrinho para esse usuário')
    })
  }) 
})