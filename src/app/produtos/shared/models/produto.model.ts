import { UnidadeMedida } from './../enum/unidade-medida.enum';

export class Produto {
  constructor(
    public id?: number,
    public nomeItem?: string,
    public unidadeMedida?: UnidadeMedida,
    public quantidade?: number,
    public preco?: number,
    public produtoPerecivel?: boolean,
    public dataValidade?: Date,
    public dataFabricacao?: Date
  ) {}
}
