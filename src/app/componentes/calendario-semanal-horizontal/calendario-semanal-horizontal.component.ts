import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/pt-br'

@Component({
  selector: 'app-calendario-semanal-horizontal',
  templateUrl: './calendario-semanal-horizontal.component.html',
  styleUrls: ['./calendario-semanal-horizontal.component.scss']
})
export class CalendarioSemanalHorizontalComponent implements OnInit {

  @Output() diaSelecionado = new EventEmitter();
  public diaAtual: string = moment().format('dddd').toUpperCase() + ', ' + moment().format('MMMM').toUpperCase() + ' ' + moment().format('DD') + ', ' + moment().format('YYYY')
  public diasParaAVisualizacao: any;

  constructor() {
  }

  ngOnInit() {
    let quantidadeDeDiasNoTemplate = 6;
    let diasParaAVisualizacao = [];
    for (let i = 0; i < quantidadeDeDiasNoTemplate; i++) {
      var dia = moment().add(i, 'days');
      diasParaAVisualizacao.push({
        diaObjeto: dia,
        diaAbreviado: dia.format('DD'),
        diaDaSemanaAbreviado: dia.format('ddd').toUpperCase(),
        dataFull:
          dia.format('dddd').toUpperCase() +
          ', ' +
          dia.format('MMMM').toUpperCase() +
          ' ' +
          dia.format('DD') +
          ', ' +
          dia.format('YYYY')
      });
    }
    this.diasParaAVisualizacao = diasParaAVisualizacao
    this.diaSelecionado.emit(diasParaAVisualizacao[0])
  }

  GetDia(dia) {
    this.diaAtual = dia.dataFull.toString()
    this.diaSelecionado.emit(dia)
  }

}
