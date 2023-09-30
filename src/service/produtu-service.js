import service from "./service";

function obterProduto() {
    return new Promise((resolve, reject) => {
        service.get('/produtos')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function adicionarProduto(produto) {
    produto.dataCadastro = new Date().toISOString();
    return new Promise((resolve, reject) => {
        service.post('/produtos', produto)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function atualizarProduto(produto) {
    return new Promise((resolve, reject) => {
        service.put(`/produtos/${produto.id}`, produto)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluirProduto(id) {
    return new Promise((resolve, reject) => {
        service.delete(`/produtos/${id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

export default {
    obterProduto,
    adicionarProduto,
    atualizarProduto,
    excluirProduto
}