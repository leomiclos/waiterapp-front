export type StatusPedido = 'fila' | 'producao' | 'pronto';

export interface ItemPedido {
  nome: string;
  quantidade: number;
  valor: number;
}

export interface Pedido {
  id: number;
  mesa: number;
  status: StatusPedido;
  itens: ItemPedido[];

}
