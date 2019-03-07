export class Cidade {

  public id: string = '';
  public nome: string = '';
  public microrregiao: object = {
    id: '',
    nome: '',
    mesorregiao: {
      id: '',
      nome: '',
      UF: {
        id: '',
        sigla: '',
        nome: '',
        regiao: {
          id: '',
          sigla: '',
          nome: ''
        }
      }
    }
  }

}

