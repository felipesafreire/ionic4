import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class InternetService {

  constructor() { }

  verificaConexaoInternet() {

    let network = new Network()

    if (network.Connection.NONE !== network.type) {
      return true;
    } else {
      return false;
    }

  }

}


