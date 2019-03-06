import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CidadeService } from 'src/app/service/cidade/cidade.service';
import { LoadingService } from 'src/app/service/ionic/loading.service';
import { Cidade } from 'src/app/factory/cidade';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.page.html',
  styleUrls: ['./cidade.page.scss'],
})
export class CidadePage implements OnInit {

  public idCidade;
  // public cidade = <Cidade> new Cidade();
  public cidade = Cidade;
  public segment: string = 'microrregiao'

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _serviceCidade: CidadeService,
    private _loading: LoadingService
  ) {
    this.idCidade = this._activatedRoute.snapshot.paramMap.get('idCidade');
  }

  ngOnInit() {
    console.log(this.cidade);
    this.getDadosCidade()
  }

  getDadosCidade() {

    this._loading.present()

    this._serviceCidade
      .dadosCidadeIbge(this.idCidade)
      .then((result) => {
        this._loading.dismiss()
        this.cidade = result;
      }).catch((err) => {
        this._loading.dismiss()
        console.log(err);
      });

  }

}
