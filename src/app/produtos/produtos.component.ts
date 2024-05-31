import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

declare var $: any;

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtoForm: FormGroup;
  editMode: boolean = false;
  editProdutoId: number | null = null;

  @ViewChild('productModal') productModal!: ElementRef;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      codigoBarras: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      status: ['ativo', Validators.required],
      imagemUrl: ['']
    });
  }

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
  }

  openAddProductModal() {
    this.editMode = false;
    this.produtoForm.reset({ status: 'ativo' });
    $(this.productModal.nativeElement).modal('show');
  }

  openEditProductModal(produto: Produto) {
    this.editMode = true;
    this.editProdutoId = produto.id;
    this.produtoForm.patchValue(produto);
    $(this.productModal.nativeElement).modal('show');
  }

  closeProductModal() {
    $(this.productModal.nativeElement).modal('hide');
  }

  openDeleteProductModal(produtoId: number) {
    if (confirm('Você tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(produtoId);
      this.produtos = this.produtoService.getProdutos();
      alert('Produto excluído com sucesso!');
    }
  }

  addOrEditProduto() {
    if (this.produtoForm.valid) {
      if (this.editMode) {
        const editedProduto = { ...this.produtoForm.value, id: this.editProdutoId };
        this.produtoService.editProduto(editedProduto);
        this.editMode = false;
        this.editProdutoId = null;
      } else {
        const newProduto = { ...this.produtoForm.value, id: this.produtos.length + 1 };
        this.produtoService.addProduto(newProduto);
      }
      this.produtos = this.produtoService.getProdutos();
      this.closeProductModal();
      alert('Produto salvo com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
