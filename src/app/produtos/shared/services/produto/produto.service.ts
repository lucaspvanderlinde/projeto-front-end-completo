import { Injectable } from '@angular/core';

import { Produto } from './../../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  listarTodosProdutos(): Produto[] {
    const produtos = localStorage['produtos'];
    return produtos ? JSON.parse(produtos) : [];
  }

  cadastrarProduto(produto: Produto) {
    const produtos = this.listarTodosProdutos();
    produto.id = new Date().getTime();
    produtos.push(produto);
    localStorage['produtos'] = JSON.stringify(produtos);
  }

  buscarPorId(id: number): Produto {
    const produtos: Produto[] = this.listarTodosProdutos();
    return produtos.find(produto => produto.id === id);
  }

  atualizarProduto(produto: Produto) {
    const produtos: Produto[] = this.listarTodosProdutos();
    produtos.forEach((obj, index, objs) => {
      if (produto.id === obj.id) {
        objs[index] = produto;
      }
    });
    localStorage['produtos'] = JSON.stringify(produtos);
  }

  removerProduto(id: number) {
    let produtos: Produto[] = this.listarTodosProdutos();
    produtos = produtos.filter(produto => produto.id !== id);
    localStorage['produtos'] = JSON.stringify(produtos);
  }
}
