import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    new Produto(1, 'Produto 1', '123456789', 10, 'Categoria 1', 'ativo', ''),
    new Produto(2, 'Produto 2', '987654321', 5, 'Categoria 2', 'inativo', '')
  ];

  getProdutos(): Produto[] {
    return this.produtos;
  }

  addProduto(produto: Produto) {
    this.produtos.push(produto);
  }

  editProduto(produto: Produto) {
    const index = this.produtos.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.produtos[index] = produto;
    }
  }

  deleteProduto(id: number) {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }
}
