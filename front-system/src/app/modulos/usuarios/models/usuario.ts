export interface Telefone {
  numero_telefone: string;
  tipo_telefone: string;
}

export interface Usuario{
  id?: string;
  email: string;
  nome: string;
  sobrenome: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  complemento?: string;
  numero_residencial: string;
  cep: string;
  senha: string;
  status?: string;
  telefone: Telefone[];
}
