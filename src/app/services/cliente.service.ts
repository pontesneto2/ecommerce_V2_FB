import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = [];
  private nextId: number = 1;

  getClientes(): Cliente[] {
    return this.clientes;
  }

  addCliente(cliente: Cliente) {
    cliente.id = this.nextId++;
    this.clientes.push(cliente);
  }

  editCliente(cliente: Cliente) {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  deleteCliente(id: number) {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
  }
}
