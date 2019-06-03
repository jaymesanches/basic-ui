import { Cliente } from '../cliente/cliente';
import { OrcamentoProduto } from './orcamento-produto';
import { BaseObject } from '../../../base/base-object';

export class Orcamento extends BaseObject {
  public numero: number;
  public cliente: Cliente | number;
  public vlrTotal: number = 0;
  public orcamentosProdutos: OrcamentoProduto[];
  public dtaCriacao: Date;
  public dtaValidade: Date;
  public situacao = 'ABERTO';
  public tipoEntrega: number;
  public vlrEntrega: number = 0;
  public vlrTaxa: number = 0;
}
