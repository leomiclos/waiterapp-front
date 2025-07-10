export type StatusPedido = 'fila' | 'producao' | 'pronto';

export interface Pedido {
  id: number;
  mesa: number;
  status: StatusPedido;
  itens: number;
}
