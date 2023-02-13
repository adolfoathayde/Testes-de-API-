describe('Login sem sucesso', () => {

    it('E-mail inválido', () => {
        cy.Login('fulano@qa.comFAIL', 'testeFAIL')
            .should(({ status, body }) => {
                expect(status).to.equal(400)
                expect(body.email).to.equal('email deve ser um email válido')
            })
    })

    it('Senha inválida', () => {
        cy.Login('fulano@qa.com', 'testeFAIL')
            .should(({ status, body }) => {
                expect(status).to.equal(401)
                expect(body.message).to.equal('Email e/ou senha inválidos')
            })
    })

    it('E-mail não preenchido', () => {
        cy.Login('', 'testeFAIL')
            .should(({ status, body }) => {
                expect(status).to.equal(400)
                expect(body.email).to.equal('email não pode ficar em branco')
            })
    })

    it('Senha não preenchida', () => {
        cy.Login('fulano@qa.com', '')
            .should(({ status, body }) => {
                expect(status).to.equal(400)
                expect(body.password).to.equal('password não pode ficar em branco')
            })
    })

    it('Nenhum campo preenchido', () => {
        cy.Login('', '')
            .should(({ status, body }) => {
                expect(status).to.equal(400)
                expect(body.email).to.equal('email não pode ficar em branco')
                expect(body.password).to.equal('password não pode ficar em branco')
            })

    })
})