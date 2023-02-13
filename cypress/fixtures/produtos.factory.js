const faker = require('faker-br');
exports.novoProduto = () =>{
    return {
        "nome": `testAuto-${faker.random.number(9999999)}`,
        "preco": 40, 
        "descricao": `testAuto-${faker.random.number(9999999)}`,
        "quantidade" : 1000,       
    }
}