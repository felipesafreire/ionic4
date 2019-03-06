// export interface ICidade {
//   id?: number;
//   nome?: string;
//   microrregiao: {
//     id?: number;
//     nome?: string;
//     mesorregiao: {
//       id?: number;
//       nome?: string;
//       UF: {
//         id?: number;
//         sigla?: string;
//         nome?: string;
//         regiao: {
//           id?: number;
//           sigla?: string;
//           nome?: string
//         }
//       }
//     }
//   }
// }

// export class Cidade implements ICidade {
//   public microrregiao: any;
// }

export const Cidade =  {
  id: '',
  nome: '',
  microrregiao: {
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
