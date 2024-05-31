export class Produto {
    constructor(
      public id: number,
      public nome: string,
      public codigoBarras: string,
      public quantidade: number,
      public categoria: string,
      public status: string,
      public imagemUrl: string
    ) {}
  }
  