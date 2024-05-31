import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../models/pedido.model';
import { PedidoProduto } from '../models/pedidoProduto.model';
import { PedidoService } from '../services/pedido.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoForm: FormGroup;
  produtos: Produto[] = [];
  editMode: boolean = false;
  editPedidoId: number | null = null;

  constructor(private fb: FormBuilder, private pedidoService: PedidoService, private produtoService: ProdutoService) {
    this.pedidoForm = this.fb.group({
      clienteNome: ['', Validators.required],
      clienteEmail: ['', [Validators.required, Validators.email]],
      clienteEndereco: ['', Validators.required],
      produtos: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.pedidos = this.pedidoService.getPedidos();
    this.produtos = this.produtoService.getProdutos();
  }

  openAddPedidoModal() {
    this.editMode = false;
    this.pedidoForm.reset();
  }

  openEditPedidoModal(pedido: Pedido) {
    this.editMode = true;
    this.editPedidoId = pedido.id;
    this.pedidoForm.patchValue({
      clienteNome: pedido.clienteNome,
      clienteEmail: pedido.clienteEmail,
      clienteEndereco: pedido.clienteEndereco,
      produtos: pedido.produtos.map(p => p.produtoId)
    });
  }

  openDeletePedidoModal(pedidoId: number) {
    if (confirm('Você tem certeza que deseja excluir este pedido?')) {
      this.pedidoService.deletePedido(pedidoId);
      this.pedidos = this.pedidoService.getPedidos();
      alert('Pedido excluído com sucesso!');
    }
  }

  addOrEditPedido() {
    if (this.pedidoForm.valid) {
      const pedidoProdutos = this.pedidoForm.value.produtos.map((produtoId: number) => new PedidoProduto(produtoId, 1)); // Ajuste a quantidade conforme necessário
      const newPedido = new Pedido(
        this.editPedidoId ?? this.pedidos.length + 1,
        this.pedidoForm.value.clienteNome,
        this.pedidoForm.value.clienteEmail,
        this.pedidoForm.value.clienteEndereco,
        new Date(),
        pedidoProdutos
      );

      if (this.editMode) {
        this.pedidoService.editPedido(newPedido);
        this.editMode = false;
        this.editPedidoId = null;
      } else {
        this.pedidoService.addPedido(newPedido);
      }
      this.pedidos = this.pedidoService.getPedidos();
      alert('Pedido salvo com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
