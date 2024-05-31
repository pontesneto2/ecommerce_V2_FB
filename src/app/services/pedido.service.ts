import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { PedidoProduto } from '../models/pedidoProduto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private nextId: number = 1;

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  addPedido(pedido: Pedido) {
    pedido.id = this.nextId++;
    this.pedidos.push(pedido);
  }

  editPedido(pedido: Pedido) {
    const index = this.pedidos.findIndex(p => p.id === pedido.id);
    if (index !== -1) {
      this.pedidos[index] = pedido;
    }
  }

  deletePedido(id: number) {
    this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
  }
}
