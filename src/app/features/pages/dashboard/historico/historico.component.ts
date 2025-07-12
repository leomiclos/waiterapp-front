import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from '../../../../models/pedido.models';

@Component({
  selector: 'app-historico',
  imports: [CommonModule, FormsModule, NgbToastModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {



  @ViewChild('detalhesPedido') detalhesPedidoTpl!: TemplateRef<any>;


  modalService = inject(NgbModal)

  pedidos = [
    {
      id: 1,
      mesa: 3,
      status: 'fila',
      data: new Date('2025-07-10T12:30:00'),
      itens: [
        { nome: 'X-Burguer', quantidade: 1, valor: 22.9 },
        { nome: 'Coca-Cola', quantidade: 1, valor: 7.5 },
      ],
    },
    {
      id: 2,
      mesa: 5,
      status: 'producao',
      data: new Date('2025-07-11T14:00:00'),
      itens: [
        { nome: 'Pizza Calabresa', quantidade: 1, valor: 38.0 },
        { nome: 'Suco de Laranja', quantidade: 2, valor: 10.0 },
      ],
    },
    {
      id: 3,
      mesa: 1,
      status: 'pronto',
      data: new Date('2025-07-09T19:15:00'),
      itens: [
        { nome: 'Espaguete', quantidade: 2, valor: 28.0 },
        { nome: 'Água', quantidade: 2, valor: 5.0 },
      ],
    },
    {
      id: 4,
      mesa: 2,
      status: 'fila',
      data: new Date('2025-07-12T11:45:00'),
      itens: [{ nome: 'Hambúrguer Vegano', quantidade: 1, valor: 26.5 }],
    },
    {
      id: 5,
      mesa: 4,
      status: 'producao',
      data: new Date('2025-07-10T17:30:00'),
      itens: [{ nome: 'Strogonoff de Frango', quantidade: 2, valor: 32.0 }],
    },
    {
      id: 6,
      mesa: 6,
      status: 'fila',
      data: new Date('2025-07-11T13:20:00'),
      itens: [
        { nome: 'Batata Frita', quantidade: 2, valor: 15.0 },
        { nome: 'Refrigerante', quantidade: 3, valor: 9.0 },
      ],
    },
    {
      id: 7,
      mesa: 7,
      status: 'pronto',
      data: new Date('2025-07-09T20:50:00'),
      itens: [{ nome: 'Pastel de Carne', quantidade: 3, valor: 12.0 }],
    },
    {
      id: 8,
      mesa: 8,
      status: 'producao',
      data: new Date('2025-07-12T18:00:00'),
      itens: [
        { nome: 'Risoto de Camarão', quantidade: 1, valor: 45.0 },
        { nome: 'Suco de Uva', quantidade: 3, valor: 11.0 },
      ],
    },
    {
      id: 9,
      mesa: 9,
      status: 'fila',
      data: new Date('2025-07-10T15:15:00'),
      itens: [
        { nome: 'Pizza Marguerita', quantidade: 1, valor: 36.0 },
        { nome: 'Água com Gás', quantidade: 1, valor: 6.0 },
      ],
    },
    {
      id: 10,
      mesa: 10,
      status: 'pronto',
      data: new Date('2025-07-11T09:00:00'),
      itens: [{ nome: 'Café Expresso', quantidade: 1, valor: 8.0 }],
    },
  ];


  pedidoSelecionado: any = null;

  ordemAsc: boolean = true;

  pedidosFiltrados = [...this.pedidos];

  filtroData: string = '';

  aplicarFiltro() {
    this.ordemAsc = !this.ordemAsc;

    let listaParaOrdenar = this.filtroData ? [...this.pedidosFiltrados] : [...this.pedidos];

    const ordenados = listaParaOrdenar.sort((a, b) => {
      const diff = a.data.getTime() - b.data.getTime();
      return this.ordemAsc ? diff : -diff;
    });

    this.pedidosFiltrados = ordenados;
  }

  // Atualiza a lista filtrada quando muda o filtro de data
  filtrarPorData() {
    if (!this.filtroData) {
      this.pedidosFiltrados = [...this.pedidos];
    } else {
      const filtroTimestamp = new Date(this.filtroData).setHours(0, 0, 0, 0);
      this.pedidosFiltrados = this.pedidos.filter(pedido => {
        const pedidoTimestamp = new Date(pedido.data).setHours(0, 0, 0, 0);
        return pedidoTimestamp === filtroTimestamp;
      });
    }

    this.aplicarOrdenacaoSemAlterarOrdem();
  }

  aplicarOrdenacaoSemAlterarOrdem() {
    const ordenados = [...this.pedidosFiltrados].sort((a, b) => {
      const diff = a.data.getTime() - b.data.getTime();
      return this.ordemAsc ? diff : -diff;
    });
    this.pedidosFiltrados = ordenados;
  }

  limparFiltro() {
    this.filtroData = '';
    this.pedidosFiltrados = [...this.pedidos];
    this.aplicarOrdenacaoSemAlterarOrdem();
  }

  excluirPedido(pedido: any) {
    if (confirm(`Confirma exclusão do pedido da mesa ${pedido.mesa}?`)) {
      this.pedidos = this.pedidos.filter(p => p !== pedido);
      this.filtrarPorData();
    }
  }

  verDetalhes(pedido: any, template: TemplateRef<any>) {
    this.pedidoSelecionado = pedido;
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
    })
  }


  calculaTotal(pedido: { itens: { nome: string; quantidade: number; valor: number }[] }): number {
    return pedido.itens.reduce((total, item) => total + item.quantidade * item.valor, 0);
  }



}
