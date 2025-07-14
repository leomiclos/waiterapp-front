import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagemUrl: string;
  descricao?: string;
}

interface Categoria {
  nome: string;
  emoji: string;
}

@Component({
  selector: 'app-cardapio',
  imports: [CommonModule, FormsModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {
  // Modal Service (usado com ng-template)
  modalService = inject(NgbModal);

  // Tabs
  abaSelecionada: 'produtos' | 'categorias' = 'produtos';
  mudarAba(aba: 'produtos' | 'categorias') {
    this.abaSelecionada = aba;
  }

  // Produtos
  produtos: Produto[] = [
    { id: 1, nome: 'Quatro Queijos', categoria: 'Pizza', preco: 40.00, imagemUrl: 'assets/images/marguerita.png' },
    { id: 2, nome: 'Calabresa', categoria: 'Pizza', preco: 42.00, imagemUrl: 'assets/images/marguerita.png' },
    { id: 3, nome: 'Marguerita', categoria: 'Pizza', preco: 45.00, imagemUrl: 'assets/images/marguerita.png' }
  ];

  produtoSelecionado: Produto | null = null;
  ingredientesSelecionados: string[] = [];

  ingredientesDisponiveis = [
    { nome: 'Prato', emoji: '🧀' },
    { nome: 'Cheddar', emoji: '🧀' },
    { nome: 'Mussarela', emoji: '🧀' },
    { nome: 'Parmesão', emoji: '🧀' },
    { nome: 'Cebola', emoji: '🧅' },
    { nome: 'Rúcula', emoji: '🌿' },
    { nome: 'Tomate', emoji: '🍅' },
    { nome: 'Orégano', emoji: '🌿' }
  ];

abrirModalProduto(produto: Produto, modalRef: TemplateRef<any>) {
  this.produtoSelecionado = { ...produto };
  this.ingredientesSelecionados = ['Prato', 'Cheddar', 'Mussarela', 'Parmesão'];

  setTimeout(() => {
    this.modalService.open(modalRef, {
      centered: true,
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title',
      scrollable: true
    });
  });
}


  salvarAlteracoes() {
    console.log('Produto salvo:', this.produtoSelecionado);
    console.log('Ingredientes:', this.ingredientesSelecionados);
    this.modalService.dismissAll();
  }

  excluirProduto(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }

  alternarIngrediente(nome: string): void {
    const index = this.ingredientesSelecionados.indexOf(nome);
    index > -1
      ? this.ingredientesSelecionados.splice(index, 1)
      : this.ingredientesSelecionados.push(nome);
  }

  // Categorias
  categorias: Categoria[] = [
    { nome: 'Pizza', emoji: '🍕' },
    { nome: 'Bebidas', emoji: '🥤' },
    { nome: 'Sobremesas', emoji: '🍰' }
  ];

  categoriaSelecionada: Categoria = { nome: '', emoji: '' };

  abrirModalCategoria(categoria: Categoria, modalRef: TemplateRef<any>) {
    this.categoriaSelecionada = { ...categoria };
    this.modalService.open(modalRef, { centered: true });
  }

  salvarCategoria() {
    const index = this.categorias.findIndex(c => c.nome === this.categoriaSelecionada.nome);
    if (index !== -1) {
      this.categorias[index] = { ...this.categoriaSelecionada };
    }
    this.modalService.dismissAll();
  }

  excluirCategoria(nome: string) {
    this.categorias = this.categorias.filter(c => c.nome !== nome);
  }
}
