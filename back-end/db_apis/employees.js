const database = require('../services/database.js');
const oracledb = require('oracledb');

//---------------------------------------------------Para el GET
const baseQuery = 
 `select id_prueba "id",
    nombre "nombre"
  from prueba`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.id_prueba = context.id;
 
    query += `\nwhere id_prueba = :id_prueba`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
module.exports.find = find;

//------------------------------------------------------------Para el Post
const createSql =
 `insert into prueba (
    nombre
  ) values (
    :nombre
  ) returning id_prueba
  into :id_prueba`;
 
async function create(emp) {
  const employee = Object.assign({}, emp);
 
  employee.id_prueba = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
 
  const result = await database.simpleExecute(createSql, employee);
 
  employee.id_prueba = result.outBinds.id_prueba[0];
 
  return employee;
}
module.exports.create = create;

//----------------------------------------------------------------Para el Update
const updateSql =
 `update prueba
  set nombre = :nombre
  where id_prueba = :id_prueba`;
 
async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}
module.exports.update = update;

//-------------------------------------------------------------------Para el Delete
const deleteSql =
 `begin
 
    delete from prueba
    where id_prueba = :id_prueba;
 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(id) {
  const binds = {
    id_prueba: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del;