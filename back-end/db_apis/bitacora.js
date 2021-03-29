const database = require('../services/database.js');
const oracledb = require('oracledb');

//------------------------------------------------------------Para el Post
const createSql =
    `begin
        llenadoBitacora(:usuario_, :destino_, :tipo, :accion_);
    end;`;
 
async function create(emp) {
  const bitacora = Object.assign({}, emp);
 /*
  bitacora.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }*/
 
  const result = await database.simpleExecute(createSql, bitacora);
 
  //bitacora.id = result.outBinds.id[0];
 
  return bitacora;
}
module.exports.create = create;