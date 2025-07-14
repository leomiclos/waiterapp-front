import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagemUrl: string;
}
interface Categoria {
  nome: string;
  emoji: string;
}

@Component({
  selector: 'app-cardapio',
  imports: [CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {

  abaSelecionada: 'produtos' | 'categorias' = 'produtos';


  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Quatro Queijos',
      categoria: 'Pizza',
      preco: 40.00,
      imagemUrl: 'assets/images/pizza-quatro-queijos.jpg'
    },
    {
      id: 2,
      nome: 'Quatro Queijos',
      categoria: 'Pizza',
      preco: 40.00,
      imagemUrl: 'assets/images/pizza-quatro-queijos.jpg'
    },
    {
      id: 3,
      nome: 'Quatro Queijos',
      categoria: 'Pizza',
      preco: 40.00,
      imagemUrl: 'assets/images/pizza-quatro-queijos.jpg'
    }
  ];

  categorias: Categoria[] = [
    { nome: 'Pizza', emoji: '🍕' },
    { nome: 'Bebidas', emoji: '🥤' },
    { nome: 'Sobremesas', emoji: '🍰' }
  ];

  editarProduto(id: number) {
    console.log('Editar produto com ID:', id);
  }

  excluirProduto(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }

  excluirCategoria(nome: string) {
    this.categorias = this.categorias.filter(c => c.nome !== nome);
  }

  mudarAba(aba: 'produtos' | 'categorias') {
    this.abaSelecionada = aba;
  }
}
