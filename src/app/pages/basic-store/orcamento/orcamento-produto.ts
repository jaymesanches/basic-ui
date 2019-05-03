import { Produto } from '../produto/produto';

export class OrcamentoProduto {
  public produto: Produto | number;
  public tamanho: number;
  public quantidade: number;
  public vlrUnitario: number;
}
