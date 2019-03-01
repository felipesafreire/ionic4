import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Promise } from 'q';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private metodo: String = '';
  private endpoint: String = '';
  private parametros: any;

  constructor(metodo, endpoint, parametros) {
    this.metodo = metodo;
    this.endpoint = endpoint;
    this.parametros = parametros;
  }

  executarRequest() {

    return Promise((resolve, reject) => {

      if (window.cordova) {

        let network = new Network()

        if (network.Connection.NONE !== network.type) {

          //return resolve com a requisição
          resolve('requisição')

        } else {
          reject(null);
        }

      } else {
        //verificar se tem conexão com a internet se tiver fazer a requisição
        reject(null);
      }

    })

  }

}
