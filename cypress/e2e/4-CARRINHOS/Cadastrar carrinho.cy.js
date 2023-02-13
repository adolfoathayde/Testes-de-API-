describe('Cadastrar carrinho', () => {
  const faker = require('faker-br');
  const { novoUsuario } = require('../../fixtures/usuarios.factory');
  const { novoCarrinho, novoCarrinhoDobrado } = require('../../fixtures/carrinhos.factory');  

  it('token ausente, inválido ou expirado', () => {
    cy.CadastrarCarrinhos(novoCarrinho()) 
      .should(({ status, body }) => {
        expect(status).to.equal(401)
        expect(body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })

  it('produto duplicado', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.CadastrarCarrinhos(novoCarrinhoDobrado())   
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Não é permitido possuir produto duplicado')
      })
  })

  it('produto não encontrado', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.CadastrarCarrinhos(novoCarrinho("idprodutofalso"))   
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Produto não encontrado')
      })
  })

  it('quantidade insuficiente do produto', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.ListarProdutos()
    .then(listaProd => {
      const produto = listaProd.body.produtos[0]._id
    cy.CadastrarCarrinhos(novoCarrinho(produto,999999999999999)) 
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Produto não possui quantidade suficiente')
      })
    })
  })

  it('cadastro com sucesso', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.ListarProdutos()
    .then(listaProd => {
      const produto = listaProd.body.produtos[0]._id
      cy.CadastrarCarrinhos(novoCarrinho(produto))
      .should(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.message).to.equal('Cadastro realizado com sucesso')
      })
    }) 

  })

  it('usuario não pode ter multiplos carrinhos', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.Login(setBody.email,setBody.password)
    cy.CadastrarCarrinhos(novoCarrinho())
    cy.CadastrarCarrinhos(novoCarrinho())
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Não é permitido ter mais de 1 carrinho')
      })
  })

})