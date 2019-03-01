export function criaStringDadosEmMassa(objeto) {

  let sql = '';

  for (let i = 0; i < objeto.length; i++) {
    sql += "()"
  }
  return sql;

}



export function chunkArray(myArray, chunk_size) {
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
}

