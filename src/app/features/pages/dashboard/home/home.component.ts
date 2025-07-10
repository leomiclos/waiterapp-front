import { Component, computed, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from '../../../../models/pedido.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbDatepickerModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  //não usa mais constructor
  private modalService = inject(NgbModal);
  fila = computed(() => this.pedidos().filter(p => p.status === 'fila'));
  producao = computed(() => this.pedidos().filter(p => p.status === 'producao'))
  pronto = computed(() => this.pedidos().filter(p => p.status === 'pronto'))


  closeResult: WritableSignal<string> = signal('');

  pedidos: WritableSignal<Pedido[]> = signal([
    { id: 1, mesa: 3, status: 'fila', itens: 2 },
    { id: 2, mesa: 5, status: 'producao', itens: 3 },
    { id: 3, mesa: 1, status: 'pronto', itens: 4 },
    { id: 4, mesa: 2, status: 'fila', itens: 1 },
    { id: 5, mesa: 4, status: 'producao', itens: 2 },
    { id: 6, mesa: 6, status: 'fila', itens: 5 },
    { id: 7, mesa: 7, status: 'pronto', itens: 3 },
    { id: 8, mesa: 8, status: 'producao', itens: 4 },
    { id: 9, mesa: 9, status: 'fila', itens: 2 },
    { id: 10, mesa: 10, status: 'pronto', itens: 1 },
  ]);




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
