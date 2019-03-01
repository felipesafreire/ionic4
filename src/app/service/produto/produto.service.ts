import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import Produto from '../../factory/produto';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { chunkArray } from '../../helper/database';
import { quantidadeProdutoImportado } from '../../constants/produtos';
import { RequestOptions, Request, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  public contador = 1;

  constructor(private database: DatabaseService, private _http: HttpClient) { }

  buscarProdutos() {

    return (
      this._http
        .get("/cidades/mg")
        .toPromise()
        .then(success => {
          return success;
        }, error => {
          return error;
        })
    )

  }

  criarProdutoEmMassa(prods) {

    let quantidadeProduto = 1000;

    let produtos = chunkArray(prods, quantidadeProduto);
    return (
      this.database
        .getDatabase()
        .then((db: SQLiteObject) => {

          //function executeSQL
          // for (var i = 0; i < produtos.length; i++) {
          //   let sql = "INSERT INTO produto (titulo, preco) VALUES ";
          //   let data = [];
          //   let rowAr = [];
          //   produtos[i].forEach(produto => {
          //     rowAr.push("(?, ?)");
          //     data.push(produto.titulo);
          //     data.push(produto.preco);
          //   });
          //   sql += rowAr.join(", ");
          //   db.executeSql(sql, data)
          //     .then(success => {
          //       console.log(success)
          //       quantidadeProdutoImportado.push(this.contador + " " + data.length + " produtos")
          //       this.contador++;
          //     })
          //     .catch(err => console.error(err))
          // }

          for (var i = 0; i < produtos.length; i++) {
            let insertRows = [];
            produtos[i].forEach(item => {
              insertRows.push([
                "INSERT INTO produto (titulo, preco) VALUES (?, ?)",
                [item.titulo, item.preco]
              ]);
            });
            db.sqlBatch(insertRows)
              .then(success => {
                console.log(success)
                quantidadeProdutoImportado.push(this.contador + " " + quantidadeProduto + " produtos")
                this.contador++;
              })
              .catch(err => console.error(err))
          }

        })
        .catch(err => console.error(err))
    )


  }


}


