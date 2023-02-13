describe('Editar produto', () => {
  const faker = require('faker-br');
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoProduto } = require('../../fixtures/produtos.factory');

  it('editar produto com token ausente, inválido ou expirado', () => {
    const setProduto = novoProduto()
    cy.CadastrarProdutos(setProduto)
    cy.EditarProdutos(setProduto.nome, setProduto.preco, setProduto.descricao, setProduto.quantidade)
      .should(({ status, body }) => {
        expect(status).to.equal(401)
        expect(body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })

  it('editar produto por ID', () => {
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(novoUsuario("true"))
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(setProduto)
    cy.EditarProdutos(setProduto.nome, faker.random.number(999), setProduto.descricao, setProduto.quantidade)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Registro alterado com sucesso')
      })
  })

  it('editar produto por nome já existente', () => {
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(novoUsuario("true"))
    cy.LoginAleatorio("true")
    cy.CadastrarProdutos(setProduto)
    cy.CadastrarUsuarios(novoUsuario("true"))
    cy.EditarProdutos(setProduto.nome, setProduto.preco, setProduto.descricao, setProduto.quantidade)
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Já existe produto com esse nome')
      })
  })

  it('Rota exclusiva para administradores', () => {
    const setProduto = novoProduto()
    cy.CadastrarUsuarios(novoUsuario())
    cy.LoginAleatorio()
    cy.CadastrarProdutos(setProduto)
      .should(({ status, body }) => {
        expect(status).to.equal(403)
        expect(body.message).to.equal('Rota exclusiva para administradores')
      })
  })

})
