const database = require('../services/database.js');
const oracledb = require('oracledb');


//---------------------------------------------------Para el GET
const baseQuery = 
 `select id "id", nombre_categoria "nombre_categoria", descripcion "descripcion",
    padre "padre", usuario_ "usuario_"
  from Categoria`;

  const baseQuery3 = 
 `select distinct nombre_categoria "nombre_categoria"
  from Categoria`;

  const baseQuery4 = 
 `Select distinct nombre_categoria "nombre_categoria"
  from categoria where padre is not null and padre in (select id from categoria`;
 
async function find(usuario_, padre) {
  let query = baseQuery;
  const binds = {};
 
  if (usuario_ && padre) {
    binds.usuario_ = usuario_;
    binds.padre = padre;
 
    query += `\nwhere usuario_= :usuario_ AND padre= :padre`;
  }
  else if (usuario_) {
    binds.usuario_ = usuario_;
 
    query += `\nwhere usuario_= :usuario_`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
module.exports.find = find;
 
async function find2(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.id = context.id;
 
    query += `\nwhere id = :id`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
module.exports.find2 = find2;
 
async function find3() {
  let query = baseQuery3;
  const binds = {};
  query += `\nwhere padre is null`;
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
module.exports.find3 = find3;
 
async function find4(nombre_categoria) {
  let query = baseQuery4;
  const binds = {};
 
  binds.nombre_categoria = nombre_categoria;
  query += `\nwhere nombre_categoria = :nombre_categoria )`;
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
module.exports.find4 = find4;


//------------------------------------------------------------Para el Post
const createSql =
 `insert into Categoria ( nombre_categoria, descripcion, padre, usuario_ )
    values ( :nombre_categoria, :descripcion, :padre, :usuario_ )
  returning id
  into :id`;
 
async function create(cat) {
  const category = Object.assign({}, cat);
 
  category.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
 
  const result = await database.simpleExecute(createSql, category);
 
  category.id = result.outBinds.id[0];
 
  return category;
}
module.exports.create = create;

//----------------------------------------------------------------Para el Update
const updateSql =
 `update Categoria
  set nombre_categoria = :nombre_categoria, descripcion = :descripcion
  where id = :id`;
 
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
 
    delete from Categoria
    where id = :id;
 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(id) {
  const binds = {
    id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del;