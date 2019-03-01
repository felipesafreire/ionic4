export interface ProdutoProperties {
  id?: Number,
  titulo?: String,
  preco?: Number
}

export class Produto {

  constructor(produto: ProdutoProperties = {}) {
    for (let key in produto) {
      this[key] = produto[key];
    }
  }

}

export default Produto