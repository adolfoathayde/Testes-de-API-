const faker = require('faker-br');

exports.novoCarrinho = (id = "BeeJh5lz3k6kSIzA" , quantidade = 1 ) => {
    return {
        "produtos": [
            {
                "idProduto": id,
                "quantidade": quantidade                
            },
            
        ]
    }
}

exports.novoCarrinhoDobrado = (id = "BeeJh5lz3k6kSIzA" , quantidade = 1 ) => {
    return {
        "produtos": [
            {
                "idProduto": id,
                "quantidade": quantidade                
            },
            {
                "idProduto": id,
                "quantidade": quantidade                
            },
        ]
    }
}