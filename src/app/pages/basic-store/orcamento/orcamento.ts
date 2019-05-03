import { Cliente } from '../cliente/cliente';
import { OrcamentoProduto } from './orcamento-produto';

export class Orcamento {
  public _id: number;
  public numero: number;
  public cliente: Cliente | number;
  public vlrTotal: number;
  public orcamentosProdutos: OrcamentoProduto[];
}
