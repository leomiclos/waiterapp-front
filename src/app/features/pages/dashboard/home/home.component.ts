import { Component, computed, EnvironmentInjector, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from '../../../../models/pedido.models';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [NgbDatepickerModule, CommonModule, DragDropModule, NgbToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  mesaToast: number | null = null;

  //não usa mais constructor
  private modalService = inject(NgbModal);
  private toastr = inject(ToastrService);
  private environmentInjector = inject(EnvironmentInjector)


  fila = computed(() => this.pedidos().filter(p => p.status === 'fila'));
  producao = computed(() => this.pedidos().filter(p => p.status === 'producao'))
  pronto = computed(() => this.pedidos().filter(p => p.status === 'pronto'))


  closeResult: WritableSignal<string> = signal('');

  pedidos: WritableSignal<Pedido[]> = signal([
    {
      id: 1,
      mesa: 3,
      status: 'fila',
      itens: [
        { nome: 'X-Burguer', quantidade: 1, valor: 22.90 },
        { nome: 'Coca-Cola', quantidade: 1, valor: 7.50 },
      ],
    },
    {
      id: 2,
      mesa: 5,
      status: 'producao',
      itens: [
        { nome: 'Pizza Calabresa', quantidade: 1, valor: 38.00 },
        { nome: 'Suco de Laranja', quantidade: 2, valor: 10.00 },
      ],
    },
    {
      id: 3,
      mesa: 1,
      status: 'pronto',
      itens: [
        { nome: 'Espaguete', quantidade: 2, valor: 28.00 },
        { nome: 'Água', quantidade: 2, valor: 5.00 },
      ],
    },
    {
      id: 4,
      mesa: 2,
      status: 'fila',
      itens: [
        { nome: 'Hambúrguer Vegano', quantidade: 1, valor: 26.50 },
      ],
    },
    {
      id: 5,
      mesa: 4,
      status: 'producao',
      itens: [
        { nome: 'Strogonoff de Frango', quantidade: 2, valor: 32.00 },
      ],
    },
    {
      id: 6,
      mesa: 6,
      status: 'fila',
      itens: [
        { nome: 'Batata Frita', quantidade: 2, valor: 15.00 },
        { nome: 'Refrigerante', quantidade: 3, valor: 9.00 },
      ],
    },
    {
      id: 7,
      mesa: 7,
      status: 'pronto',
      itens: [
        { nome: 'Pastel de Carne', quantidade: 3, valor: 12.00 },
      ],
    },
    {
      id: 8,
      mesa: 8,
      status: 'producao',
      itens: [
        { nome: 'Risoto de Camarão', quantidade: 1, valor: 45.00 },
        { nome: 'Suco de Uva', quantidade: 3, valor: 11.00 },
      ],
    },
    {
      id: 9,
      mesa: 9,
      status: 'fila',
      itens: [
        { nome: 'Pizza Marguerita', quantidade: 1, valor: 36.00 },
        { nome: 'Água com Gás', quantidade: 1, valor: 6.00 },
      ],
    },
    {
      id: 10,
      mesa: 10,
      status: 'pronto',
      itens: [
        { nome: 'Café Expresso', quantidade: 1, valor: 8.00 },
      ],
    },
  ]);


  totalDeItens(pedido: Pedido): number {
    return pedido.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  resetDay(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  pedidoSelecionado: Pedido | null = null;

  abrirDetalhes(pedido: Pedido, template: TemplateRef<any>) {
    this.pedidoSelecionado = pedido;

    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
    }).result.then(
      (novoStatus) => {
        if (['fila', 'producao', 'pronto'].includes(novoStatus)) {
          this.atualizarStatus(pedido.id, novoStatus as 'fila' | 'producao' | 'pronto');
        }
        this.pedidoSelecionado = null; // limpa depois
      },
      () => {
        this.pedidoSelecionado = null; // limpa mesmo se cancelar
      }
    );
  }


  atualizarStatus(id: number, novoStatus: 'fila' | 'producao' | 'pronto') {
    this.pedidos.update(pedidos =>
      pedidos.map(p => p.id === id ? { ...p, status: novoStatus } : p)
    );
  }

  avisarGarcom() {
    alert(`Garçom avisado para mesa ${this.pedidoSelecionado?.mesa}`);
  }

  fecharConta() {
    console.log(`Conta fechada para mesa ${this.pedidoSelecionado?.mesa}`);
  }

  totalDoPedido(pedido: Pedido): number {
    return pedido.itens.reduce((acc, item) => acc + item.quantidade * item.valor, 0);
  }

  statusPedido(status: string | undefined): string {
    switch (status) {
      case 'fila':
        return '🕑 Na fila de espera';
      case 'producao':
        return '🧑‍🍳 Em produção';
      case 'pronto':
        return '✅ Pronto para entrega';
      default:
        return 'Status desconhecido';
    }
  }

  drop(event: CdkDragDrop<Pedido[]>, novoStatus: 'fila' | 'producao' | 'pronto') {
    if (event.previousContainer === event.container) return;

    const pedidosAtualizados = [...this.pedidos()];
    const pedidoId = event.item.data.id;
    const pedido = pedidosAtualizados.find(p => p.id === pedidoId);

    if (pedido) {
      pedido.status = novoStatus;
      this.pedidos.set(pedidosAtualizados);
      this.mesaToast = pedido.mesa; // 👈 seta a mesa no toast
      if (pedido.status == 'producao') {
        this.toastr.success(`O preparo da mesa ${this.mesaToast} iniciou`)
      }

    }
  }


  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
