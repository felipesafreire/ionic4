import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  receberDiaSelecionado(dia){
    console.log("Pai recebeu");
    console.log(dia);
  }

}
