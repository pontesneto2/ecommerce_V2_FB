import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  editMode: boolean = false;
  editClienteId: number | null = null;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

  openAddClienteModal() {
    this.editMode = false;
    this.clienteForm.reset();
  }

  openEditClienteModal(cliente: Cliente) {
    this.editMode = true;
    this.editClienteId = cliente.id;
    this.clienteForm.patchValue(cliente);
  }

  openDeleteClienteModal(clienteId: number) {
    if (confirm('Você tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(clienteId);
      this.clientes = this.clienteService.getClientes();
      alert('Cliente excluído com sucesso!');
    }
  }

  addOrEditCliente() {
    if (this.clienteForm.valid) {
      const newCliente = new Cliente(
        this.editClienteId ?? this.clientes.length + 1,
        this.clienteForm.value.nome,
        this.clienteForm.value.email,
        this.clienteForm.value.endereco
      );

      if (this.editMode) {
        this.clienteService.editCliente(newCliente);
        this.editMode = false;
        this.editClienteId = null;
      } else {
        this.clienteService.addCliente(newCliente);
      }
      this.clientes = this.clienteService.getClientes();
      alert('Cliente salvo com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
