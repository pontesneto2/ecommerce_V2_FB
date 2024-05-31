import { PedidoProduto } from './pedidoProduto.model';

export class Pedido {
  constructor(
    public id: number,
    public clienteNome: string,
    public clienteEmail: string,
    public clienteEndereco: string,
    public data: Date,
    public produtos: PedidoProduto[]
  ) {}
}
