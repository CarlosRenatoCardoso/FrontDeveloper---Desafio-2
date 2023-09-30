import './index.css';
import produtoService from '../../service/produtu-service';
import Produto from '../../models/produto';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

function ProdutoPage() {

    const [produtos, setProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produto, setProduto] = useState(new Produto());

    useEffect(() => {
        produtoService.obterProduto()
            .then(response => {
                setProdutos(response.data);
            })
            .catch()
    }, []);
    
    const salvar = () => {
        if (!produto.nome || !produto.valor) {
            Swal.fire({
                icon: 'error',
                text: 'Nome e Valor são obrigatórios!',
                confirmButtonColor: '#43A047'
            })
            return;
        }
        (modoEdicao) ? atualizarProdutoBackend(produto) : adicionarProdutoBackend(produto);
    };

    const adicionar = () => {
        setModoEdicao(false);
    };

    const editar = (e) => {
        setModoEdicao(true);
        let produtoEncontrado = produtos.find(p => p.id == e.target.id);
        produtoEncontrado.dataCadastro = produtoEncontrado.dataCadastro.substring(0, 10);
        setProduto(produtoEncontrado);
    };

    const excluir = (e) => {
        let produtoEncontrado = produtos.find(p => p.id == e.target.id);
        Swal.fire({
            title: 'Deseja realmente excluir o produto ' + produtoEncontrado.nome,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#43A047',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                excluirProdutoBackEnd(produtoEncontrado.id);
            }
        })
    };

    const limparProduto = () => {
        setProduto({
            ...produto,
            id: '',
            nome: '',
            valor: '',
            quantidadeEstoque: '',
            observacao: '',
            dataCadastro: '',
        })
    };

    const adicionarProdutoBackend = (produto) => {
        produtoService.adicionarProduto(produto)
            .then(response => {
                setProdutos(lista => [...lista, new Produto(response.data)]);
                limparProduto();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto adicionado com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(erro => {

            })
    };

    const atualizarProdutoBackend = (produto) => {
        produtoService.atualizarProduto(produto)
            .then(response => {
                atualizarProdutoNaTabela(response.data, false);
                limparProduto();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(erro => {

            })
    };

    const excluirProdutoBackEnd = (id) => {
        produtoService.excluirProduto(id)
            .then(() => {
                let produtoEncontrado = produtos.find(p => p.id == id);
                atualizarProdutoNaTabela(produtoEncontrado, true);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto excluido com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                })

            })
    };

    const atualizarProdutoNaTabela = (produtoAtualizado, removerProduto = false) => {
        let indice = produtos.findIndex((produto) => produto.id === produtoAtualizado.id);
        (removerProduto) ? produtos.splice(indice, 1) : produtos.splice(indice, 1, produto);
        setProdutos(arr => [...arr]);
    };


    return (
        <div className="container">

            <div className="row mt-3">
                <div className="col-sm-12">
                    <h4>Produtos</h4>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <button
                        id="btn-adicionar"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-produto"
                        onClick={adicionar}
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-sm-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Estoque</th>
                                <th>Observação</th>
                                <th>Cadastro</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.quantidadeEstoque}</td>
                                    <td>{produto.observacao}</td>
                                    <td>{new Date(produto.dataCadastro).toLocaleDateString()}</td>
                                    <td>
                                        <button id={produto.id} onClick={editar} class="btn btn-outline-primary btn-sm mr-2 espacar" data-bs-toggle="modal" data-bs-target="#modal-produto">Editar</button>
                                        <button id={produto.id} onClick={excluir} class="btn btn-outline-primary btn-sm mr-2 espacar">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="modal fade" id="modal-produto">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">{modoEdicao ? "Editar produto" : "Adicionar produto"}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label for="id" className="form-label">Id</label>
                                        <input
                                            disabled type="text"
                                            className="form-control"
                                            id="id"
                                            value={produto.id}
                                            onChange={(e) => setProduto({ ...produto, id: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-10">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            value={produto.nome}
                                            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label for="valor" className="form-label">Valor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="valor"
                                            value={produto.valor}
                                            onChange={(e) => setProduto({ ...produto, valor: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label for="estoque" className="form-label">Estoque</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="estoque"
                                            value={produto.quantidadeEstoque}
                                            onChange={(e) => setProduto({ ...produto, quantidadeEstoque: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-5">
                                        <label for="observacao" className="form-label">Observação</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cpf"
                                            value={produto.observacao}
                                            onChange={(e) => setProduto({ ...produto, observacao: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <label for="dataCadastro" className="form-label">Data de Cadastro</label>
                                        <input
                                            disabled type="date"
                                            className="form-control"
                                            id="dataCadastro"
                                            value={produto.dataCadastro}
                                            onChange={(e) => setProduto({ ...produto, dataCadastro: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar}>Salvar</button>
                                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdutoPage;