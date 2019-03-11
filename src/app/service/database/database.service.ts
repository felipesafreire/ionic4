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

    //CREATE TABLES 
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titulo VARCHAR(100) NOT NULL, preco NUMERIC(15,2) NOT NULL)'],
      ['CREATE TABLE IF NOT EXISTS estado(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estado VARCHAR(50) NOT NULL, uf CHAR(2) NOT NULL)'],
      ['CREATE TABLE IF NOT EXISTS cidade(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cidade VARCHAR(100) NOT NULL, cidade_id INTEGER NOT NULL, uf CHAR(2) NOT NULL)'],
      ['CREATE INDEX IF NOT EXISTS cidade_cidade ON cidade (cidade)'],
      ['CREATE INDEX IF NOT EXISTS cidade_uf ON cidade (uf)']
    ]).then(() => console.log('tabelas do banco criadas.'))
      .catch((error) => console.error("Erro ao criar as tabelas: ", error));

    //ALTER TABLES
    this.AlterTableDatabase(db);

  }

  private camposAlterTable() {
    return [
      { sql: 'ALTER TABLE cidade ADD COLUMN ibge INTEGER;', tabela: 'cidade', campo: 'ibge' },
      { sql: 'ALTER TABLE estado ADD COLUMN uf_id INTEGER;', tabela: 'estado', campo: 'uf_id' },
      { sql: 'ALTER TABLE produto ADD COLUMN categoria_id INTEGER;', tabela: 'produto', campo: 'categoria_id' },
      { sql: 'ALTER TABLE produto ADD COLUMN marca_id INTEGER;', tabela: 'produto', campo: 'marca_id' },
    ];
  }

  private async AlterTableDatabase(db: SQLiteObject) {

    let alterTable = this.camposAlterTable();
    for (let i = 0; i < alterTable.length; i++) {
      db.executeSql("SELECT " + alterTable[i].campo + " FROM " + alterTable[i].tabela + " LIMIT 1", [])
        .then()
        .catch(() => {
          this.createCampo(db, alterTable[i].sql) 
        });
    }

  }

  private createCampo(db: SQLiteObject, sql) {

    db.executeSql(sql, [])
      .then(() => console.log('SQL:', sql))
      .catch((error) => console.error("Erro ao executar alter table: ", error));

  }


}
