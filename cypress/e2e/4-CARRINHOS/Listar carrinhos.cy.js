describe('Listar carrinhos', () => {

  it('listar todos', () => {
    // const queryParam = { _id: '0uxuPY0cbmQhpEz1' }
    // cy.ListarUsuarios(queryParam)
    cy.ListarCarrinhos('')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('busca por ID', () => {
    const queryParam = { _id: 'qbMqntef4iTOwWfg' }
    cy.ListarCarrinhos(queryParam)
   // cy.ListarCarrinhos('/qbMqntef4iTOwWfg')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('busca por preço total', () => {
    const queryParam = { precoTotal: 6180 }
    cy.ListarCarrinhos(queryParam)
    //cy.ListarCarrinhos('?precoTotal=6180')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('busca por quantidade total', () => {
    const queryParam = { quantidadeTotal: 3 }
    cy.ListarCarrinhos(queryParam)
    //cy.ListarCarrinhos('?quantidadeTotal=3')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('busca por ID do usuário', () => {
    const queryParam = { idUsuario: "oUb7aGkMtSEPf6BZ" }
    cy.ListarCarrinhos(queryParam)
    //cy.ListarCarrinhos('?idUsuario=oUb7aGkMtSEPf6BZ')
      .should(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.not.equal('')
      })
  })

  it('carrinho não encontrado', () => {
    const queryParam = { _id: "idfail" }
    cy.ListarCarrinhos(queryParam)
   // cy.ListarCarrinhos('/idfail')
      // .should(({ status, body }) => {
      //   expect(status).to.equal(400)
      //   expect(body.message).to.equal('Carrinho não encontrado')
      // })
  })

})