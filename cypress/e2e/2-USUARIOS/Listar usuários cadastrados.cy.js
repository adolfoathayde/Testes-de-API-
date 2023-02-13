describe('Listar usuários cadastrados', () => {
  const faker = require('faker-br');
  const { novoUsuario } = require('../../fixtures/usuarios.factory');

  it('lista de usuários', () => {
    cy.ListarUsuarios('')
      .then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('usuário identificado por ID', () => {
    cy.ListarUsuarios()
      .then(listaUser => {
        const usuario = listaUser.body.usuarios[0]._id
        const queryParam = { _id: usuario }
        cy.ListarUsuarios(queryParam)
          .should(({ status, body }) => {
            expect(status).to.equal(200)
            expect(body).to.not.equal('')
          })
      })
  })


  it('usuário identificado por nome', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    const queryParam = { nome: setBody.nome }
    cy.ListarUsuarios(queryParam)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('usuário identificado por E-mail', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    const queryParam = { email: setBody.email }
    cy.ListarUsuarios(queryParam)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.not.equal(0)
      })
  })

  it('usuário identificado por Password', () => {
    const setBody = novoUsuario()
    cy.CadastrarUsuarios(setBody)
    const queryParam = { password: setBody.password }
    cy.ListarUsuarios(queryParam)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.not.equal(0)
      })
  })

  // it('usuário não encontrado', () => {
  //   cy.ListarUsuarios('/valoridnaovalido')
  //     .should(({ status, body }) => {
  //       expect(status).to.equal(400)
  //       expect(body.message).to.equal('Usuário não encontrado')
  //     })
  // })

  it('usuário não encontrado', () => {
    const queryParam = { nome: 'valor invalido' }
    cy.ListarUsuarios(queryParam)
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.equal(0)
      })
  })

})