const faker = require('faker-br');

exports.novoUsuario = (administrador = 'false', nome = `testAuto-${faker.random.number(9999999)}`,email = `testAuto-${faker.random.number(9999999)}@qa.com` ,senha = 'teste') => {
    return {
        "nome": nome,
        "email": email,
        "password": senha,
        "administrador": administrador,
        //`testAuto-${faker.random.number(9999999)}`, `testAuto-${faker.random.number(9999999)}@qa.com`,'test');
    }
}