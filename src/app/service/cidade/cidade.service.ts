import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { HttpClient } from '@angular/common/http';
import { chunkArray } from '../../helper/database';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { QUANTIDADE_CIDADE_IMPORTADO } from '../../constants/cidades';
import { Request } from '../../constants/request';
import { InternetService } from '../internet/internet.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(
    private database: DatabaseService,
    private _http: HttpClient,
    private _serviceInternet: InternetService
  ) { }

  getApi(estado) {

    return (
      this._http
        .get(Request.BASE_URL + `cidades/${estado}`)
        .toPromise()
        .then(success => {
          return success;
        }, error => {
          return error;
        })
    )

  }

  buscarEstados() {

    if (window.cordova) {

      if (this._serviceInternet.verificaConexaoInternet()) {
        return this._http
          .get(Request.BASE_URL + `cidades/estados`)
          .toPromise()
          .then(success => {
            this.insereEstado(success);
            return success;
          }, error => {
            return (error);
          })
      } else {
        return this.buscarEstadoSqlite();
      }

    } else {
      return this._http
        .get(Request.BASE_URL + `cidades/estados`)
        .toPromise()
        .then((success) => {
          return success;
        }, error => {
          return error;
        })
    }

  }

  buscarEstadoSqlite() {

    return this.database
      .getDatabase()
      .then((db: SQLiteObject) => {
        return db.executeSql("SELECT estado as nome_estado, uf as nome_uf FROM ESTADO", [])
          .then((data) => {
            let dados = [];
            for (let i = 0; i < data.rows.length; i++) {
              let item = data.rows.item(i);
              dados.push(item);
            }
            return dados;
          });
      })
      .catch((err) => console.error(err))

  }

  importarCidades(cidades, estado) {

    if (cidades.length <= 1000) {

      this.insereCidade(cidades, estado);
      QUANTIDADE_CIDADE_IMPORTADO.push(cidades.length + " cidades")

    } else {

      let cidade = chunkArray(cidades, 1000);
      for (let i = 0; i < cidade.length; i++) {
        this.insereCidade(cidade[i], estado);
        QUANTIDADE_CIDADE_IMPORTADO.push(cidades.length + " cidades")
      }

    }

  }

  public removerCidades() {

    this.database
      .getDatabase()
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM cidade', [])
      })

  }

  public buscarCidades(estado, cidade = '', skip) {

    if (!window.cordova) {
      return this.getApi(estado);
    } else {
      let sql = "SELECT cidade as nome_cidade, cidade_id as id_cidade FROM cidade WHERE uf = ? ";
      sql += (cidade === '' ? '' : "and cidade like '%" + cidade.toUpperCase() + "%'");
      sql += "LIMIT " + Request.QUANTIDADE_LISTAGEM + " OFFSET " + skip;

      return this.database
        .getDatabase()
        .then((db: SQLiteObject) => {
          return db.executeSql(sql, [estado])
            .then((data) => {
              let dados = [];
              for (let i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                dados.push(item);
              }
              return dados;
            });
        })
        .catch((err) => console.error(err))
    }

  }

  public dadosCidadeIbge(cidadeIdIBGE) {

    return this._http
      .get(Request.BASE_URL_IBGE + `localidades/municipios/${cidadeIdIBGE}`)
      .toPromise()
      .then((success) => {
        return success;
      }, error => {
        return error;
      })

  }

  private insereCidade(cidades, estado) {

    let insertRows = [];
    for (var i = 0; i < cidades.length; i++) {
      insertRows.push(
        [
          "INSERT INTO cidade (cidade, cidade_id, uf) VALUES (?, ?, ?)",
          [cidades[i].nome_cidade, cidades[i].id_cidade, estado]
        ]
      )
    }
    return this.database
      .getDatabase()
      .then((db: SQLiteObject) => {
        db.sqlBatch(insertRows)
      })
      .catch((err) => console.error(err))
  }

  private insereEstado(estados) {

    this.database
      .getDatabase()
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM estado', [])
      })

    let insertRows = [];
    for (var i = 0; i < estados.length; i++) {
      insertRows.push(
        [
          "INSERT INTO estado (estado, uf) VALUES (?,?)",
          [estados[i].nome_estado, estados[i].nome_uf]
        ]
      )
    }
    return this.database
      .getDatabase()
      .then((db: SQLiteObject) => {
        db.sqlBatch(insertRows)
      })
      .catch((err) => console.error(err))

  }

}

