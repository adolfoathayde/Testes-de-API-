describe('Editar usuário', () => {
  const faker = require('faker-br');  
  const { novoUsuario } = require('../../fixtures/usuarios.factory');

  it('Alterado com sucesso', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)  
    cy.EditarUsuarios('id','Novo Nome',setBody.email,setBody.password)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.equal('Registro alterado com sucesso')
      })
  })

  it('Email ja cadastrado', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    cy.EditarUsuarios(faker.random.number(9999999),setBody.nome,setBody.email,setBody.password,setBody.administrador)
      .should(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.message).to.equal('Este email já está sendo usado')
      })
  })
  
})