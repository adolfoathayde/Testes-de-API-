describe('Cadastrar produtos', () => {
  const faker = require('faker-br');
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoProduto } = require('../../fixtures/produtos.factory');

  it('Token ausente, inválido ou expirado', () => {
    cy.CadastrarProdutos(novoProduto())
      .should(({ status, body }) => {
        expect(status).to.equal(401)
        expect(body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })

  it('cadastro com sucesso', () => {
    cy.CadastrarUsuarios(novoUsuario("true"))
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(novoProduto())
      .should(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.message).to.equal('Cadastro realizado com sucesso')
      })
  })

  it('já existe produto com esse nome', () => {
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(novoUsuario("true"))
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(setProduto)
    cy.CadastrarProdutos(setProduto)
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Já existe produto com esse nome')
      })
  })

  it('Rota exclusiva para administradores', () => {
    cy.CadastrarUsuarios(novoUsuario())
    cy.LoginAleatorio()
    cy.CadastrarProdutos(novoProduto())
      .should(({ status, body }) => {
        expect(status).to.equal(403)
        expect(body.message).to.equal('Rota exclusiva para administradores')
      })
  })

})