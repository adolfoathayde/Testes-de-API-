describe('Login realizado com sucesso', () => {
  const { novoUsuario } = require('../../fixtures/usuarios.factory');

  it('fazer com sucesso', () => {
    cy.CadastrarUsuarios(novoUsuario())
    cy.LoginAleatorio()
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Login realizado com sucesso')
      })
  })

})