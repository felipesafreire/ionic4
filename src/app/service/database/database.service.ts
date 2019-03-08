import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getDatabase() {

    let db = new SQLite();
    return db.create({
      name: 'fullcontrol.db',
      location: 'default'
    });

  }

  createDatabase() {

    return this.getDatabase()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.criarTabelas(db);
      })
      .catch(e => console.log(e));
  }

  public criarTabelas(db: SQLiteObject) {

    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titulo VARCHAR(100) NOT NULL, preco NUMERIC(15,2) NOT NULL)'],
      ['CREATE TABLE IF NOT EXISTS estado(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estado VARCHAR(50) NOT NULL, uf CHAR(2) NOT NULL)'],
      ['CREATE TABLE IF NOT EXISTS cidade(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cidade VARCHAR(100) NOT NULL, cidade_id INTEGER NOT NULL, uf CHAR(2) NOT NULL)'],
      ['CREATE INDEX IF NOT EXISTS cidade_cidade ON cidade (cidade)'],
      ['CREATE INDEX IF NOT EXISTS cidade_uf ON cidade (uf)'],
      ['IF DOES NOT EXISTS ALTER TABLE CIDADE ADD COLUMN  IGBE INTEGER'],
    ])
      .then(() => console.log('tabelas do banco criadas.'))
      .catch((error) => console.error("Erro ao criar as tabelas: ", error));

    //ALTER TABLES VERIFY COLUMN IN DATABASE -> fazer função de verificar campos na tabela para alter table
    //console.log(this.VerificaCamposTabela(db, 'cidade', 'cidade_id'));

  }

  private VerificaCamposTabela(db: SQLiteObject, tabela, campo) {

    let sql = "PRAGMA table_info(" + tabela + ");"
    let retorno = db.executeSql(sql, [])
      .then(result => {
        for (var i = 0; i < result.rows.length; i++) {
          if (result.rows.item(i).name == campo) {
            return false;
          }
        }
      })
      .catch(err => { return false });

    return retorno;

  }


}
