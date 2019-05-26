import { Produto } from '../produto/produto';
import { BaseObject } from '../../../base/base-object';

export class OrcamentoProduto extends BaseObject {
  public produto: Produto | number;
  public tamanho: string;
  public quantidade: number;
  public vlrUnitario: number;
}
