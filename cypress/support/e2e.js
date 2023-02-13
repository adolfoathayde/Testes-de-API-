// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'cypress-plugin-api'
import './login'
import './usuarios'
import './produtos'
import './carrinhos'

// before('login', () => {
//  cy.LoginAleatorio()
//  cy.LoginAleatorio('true')    

// //  cy.LoginTokenId('fulanoUSER@qa.com', 'teste', 'TokenUser','IdUser')
// //  cy.LoginTokenId('fulano@qa.com', 'teste', 'TokenAdm','IdAdm') 
// }); 
