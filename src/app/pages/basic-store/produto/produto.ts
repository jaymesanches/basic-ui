import { Estoque } from './estoque';

export class Produto {
  _id: number;
  codigo: string;
  descricao: string;
  peso: number;
  cor: string;
  valor: number;
  estoque: Estoque = new Estoque();
}
