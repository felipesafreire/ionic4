
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from './../../service/produto/produto.service';
import { CidadeService } from './../../service/cidade/cidade.service';
import { QUANTIDADE_CIDADE_IMPORTADO } from './../../constants/cidades';
import { LoadingService } from './../../service/ionic/loading.service';
import { criarAlertaIonic } from './../../helper/ionic';
import { AlertController, IonContent } from '@ionic/angular';
import { Request } from './../../constants/request';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('content') content: IonContent;

  public lingua: string = window.localStorage.getItem('traducao')
  public listaImportado: any;
  public uf: string = '';
  public ufFiltro: string = '';
  public filtrarCidade: string = '';
  public cidades: any = [];
  public estados: any = [];
  public listaCidade = {
    items: [],
    total: 0,
    skip: 0,
    hasMoreData: false
  }

  constructor(
    private _serviceProduto: ProdutoService,
    private _serviceCidade: CidadeService,
    private _loading: LoadingService,
    private alertController: AlertController,
    private _translate: TranslateService
  ) {
    //this.listaImportado = quantidadeProdutoImportado;
    this.listaImportado = QUANTIDADE_CIDADE_IMPORTADO;
  }

  ngOnInit() {
    this.buscarEstados();
  }

  async mudarTema(){

    const alert = await this.alertController.create({
      header: 'Tema',
      inputs: [
        { name: '', type: 'radio', label: 'Padrão', value: '' },
        { name: 'fullcontrol', type: 'radio', label: 'FullControl', value: 'fullcontrol' },
        { name: 'atmos', type: 'radio', label: 'AtmosERP', value: 'atmoserp' },
      ],
      buttons: [{ text: this._translate.instant("cancelar"), role: 'cancel' }, {
        text: 'OK',
        handler: (data) => {
          window.localStorage.setItem('tema', data)
          location.reload();
        }
      }]
    });

    await alert.present();

  }

  async mudarIdioma() {

    const alert = await this.alertController.create({
      header: this._translate.instant("idioma"),
      inputs: [
        { name: 'br', type: 'radio', label: 'BR', value: 'br' },
        { name: 'en', type: 'radio', label: 'EN', value: 'en' },
        { name: 'es', type: 'radio', label: 'ES', value: 'es' }
      ],
      buttons: [{ text: this._translate.instant("cancelar"), role: 'cancel' }, {
        text: 'OK',
        handler: (data) => {
          window.localStorage.setItem('traducao', data)
          this._translate.use(data);
          location.reload();
        }
      }]
    });

    await alert.present();

  }

  criarProdutos() {

    this._serviceProduto
      .buscarProdutos()
      .then(success => {

        alert(JSON.stringify(success));

        //this.importacaoProdutos(success);
      })
      .catch(err => {
        console.log(err)
      })

  }


  buscarCidades() {

    if (this.uf == '') {
      criarAlertaIonic('UF obrigatória para buscar as cidades');
      return;
    }

    this.listaCidade.skip = 0

    this._serviceCidade
      .buscarCidadesSqlite(this.uf, this.filtrarCidade, this.listaCidade.skip)
      .then((success: any) => {
        this.inserirDadosCidades(success)
        this.content.scrollToTop();
      })
      .catch(() => {
        this.listaCidade.hasMoreData = false;
      })

  }

  loadMore(event) {

    this._serviceCidade
      .buscarCidadesSqlite(this.uf, this.filtrarCidade, this.listaCidade.skip)
      .then((success: any) => {
        this.inserirDadosCidades(success)
        event.target.complete();
      })
      .catch(() => {
        this.listaCidade.hasMoreData = false;
        event.target.complete();
      })

  }

  doRefresh(event) {

    if (this.uf == '') {
      criarAlertaIonic('UF obrigatória para buscar as cidades');
      event.target.complete();
      return;
    }

    this.listaCidade.skip = 0

    this._serviceCidade
      .buscarCidadesSqlite(this.uf, this.filtrarCidade, this.listaCidade.skip)
      .then((success: any) => {
        this.inserirDadosCidades(success)
        event.target.complete();
      })
      .catch(() => {
        this.listaCidade.hasMoreData = false;
        event.target.complete();
      })

  }

  inserirDadosCidades(success) {
    this.listaCidade.skip += Request.QUANTIDADE_LISTAGEM;
    this.listaCidade.items = [];
    for (let i = 0; i < success.length; i++) {
      this.listaCidade.items.push(success[i]);
    }
    if (success.length < Request.QUANTIDADE_LISTAGEM) {
      this.listaCidade.hasMoreData = false;
    } else {
      this.listaCidade.hasMoreData = true;
    }
  }

  importacaoProdutos(produtos) {

    this._serviceProduto
      .criarProdutoEmMassa(produtos)
      .then((success) => {
        console.log("Produtos adicionados com sucesso")
      })
      .catch(err => console.log(err));

  }

  buscarEstados() {

    this._serviceCidade
      .buscarEstados()
      .then(success => {
        this.estados = success;
      })
  }

  async sincronizarDados() {

    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Deseja realmente sincronizar os <strong>dados</strong>?',
      buttons: [{ text: 'Cancelar', role: 'cancel', cssClass: 'warning' }, {
        text: 'Sim',
        cssClass: 'success',
        handler: () => {
          this.downloadDados();
        }
      }]
    });

    await alert.present();
  }

  async downloadDados() {

    this._loading.present();

    this._serviceCidade
      .buscarEstados()
      .then(success => {
        let estados = success;
        this.estados = success
        this._serviceCidade.removerCidades();
        for (let i = 0; i < estados.length; i++) {
          this._serviceCidade
            .buscarCidades(estados[i].nome_uf.toLowerCase())
            .then(request => {
              this.importarCidades(request, estados[i].nome_uf);
            })
          if (estados.length == (i + 1)) {
            this._loading.dismiss()
          }

        }

      })


  }

  importarCidades(cidades, estado) {

    this._serviceCidade
      .importarCidades(cidades, estado)

  }

}
