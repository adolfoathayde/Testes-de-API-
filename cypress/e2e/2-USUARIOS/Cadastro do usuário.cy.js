describe('Cadastro do usuário', () => {
  const faker = require('faker-br');  
  const { novoUsuario } = require('../../fixtures/usuarios.factory');


  it('Cadastro do usuário com sucesso', () => {
    cy.CadastrarUsuarios(novoUsuario())
      .should(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.message).to.equal('Cadastro realizado com sucesso')
      })
  })

  it('Cadastro de administrador com sucesso', () => {
    cy.CadastrarUsuarios(novoUsuario('true'))
      .should(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.message).to.equal('Cadastro realizado com sucesso')
      })
  })

  it('Cadastro sem sucesso e-mail já cadastrado', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.CadastrarUsuarios(setBody)
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Este email já está sendo usado')
      })
  })

  it('Cadastro sem nome', () => {
    cy.CadastrarUsuarios(novoUsuario('false',''))
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.nome).to.equal('nome não pode ficar em branco')
      })
  })

  it('Cadastro sem E-mail', () => {
    cy.CadastrarUsuarios(novoUsuario('false',`testAuto-${faker.random.number(9999999)}`,''))
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.email).to.equal('email não pode ficar em branco')
      })
  })

  it('Cadastro sem senha', () => {    
    cy.CadastrarUsuarios(novoUsuario('false',`testAuto-${faker.random.number(9999999)}`, `testAuto-${faker.random.number(9999999)}@qa.com`,''))
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.password).to.equal('password não pode ficar em branco')
      })
  })
})