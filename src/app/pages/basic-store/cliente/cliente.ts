import { Endereco } from './endereco';

export class Cliente {
  _id: number;
  codigo: string;
  nome: string;
  email: number;
  documento: number;
  instagram: string;
  enderecos: Endereco[] = []; 
}
