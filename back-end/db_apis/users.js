const database = require('../services/database.js');
const oracledb = require('oracledb');

//---------------------------------------------------Para el GET del LOGIN
const baseQuery =
  `select id "id", nombre "nombre", apellido "apellido", clave "clave", correo "correo",
    telefono "telefono", fotografia "fotografia", genero "genero", fecha_nacimiento "fecha_nacimiento",
    fecha_registro "fecha_registro", direccion "direccion", credito_ "credito_", ganancia "ganancia",
    rol_ "rol_", estado_ "estado_"
  from Usuario`;

async function find(correo, clave) {
  let query = baseQuery;
  const binds = {};

  if (correo && clave) {
    binds.correo = correo;
    binds.clave = clave;

    query += `\nwhere correo = :correo AND clave= :clave`;

    const result = await database.simpleExecute(query, binds);

    return result.rows;
  }
  else {
    return 0;
  }
}
module.exports.find = find;

//------------------------------------------------------------Para el Post
const createSql =
  `insert into usuario(nombre, apellido, clave, correo, telefono, fotografia, genero, fecha_nacimiento,
    direccion, credito_, rol_, estado_) values (
    :nombre, :apellido, :clave, :correo, :telefono, :fotografia, :genero, :fecha_nacimiento,
    :direccion, :credito_, :rol_, :estado_
  ) returning id
  into :id`;

const createSql2 =
  `insert into usuario(nombre, apellido, clave, correo, telefono, fotografia, genero, direccion,
    credito_, rol_, estado_) values (
    :nombre, :apellido, :clave, :correo, :telefono, :fotografia, :genero, :direccion,
    :credito_, :rol_, :estado_
   ) returning id
   into :id`;

async function create(userv) {
  const user = Object.assign({}, userv);

  user.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, user);

  user.id = result.outBinds.id[0];

  return user;
}
module.exports.create = create;

async function create2(userv) {
  const user = Object.assign({}, userv);

  user.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql2, user);
  user.id = result.outBinds.id[0];
  return user;
}
module.exports.create2 = create2;


//---------------------------------------------------Para el GET
async function findUser(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id = context.id;
    query += `\nwhere id = :id`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
module.exports.findUSer = findUser;

//----------------------------------------------------------------Para el Update
const updateSql =
  `update usuario
  set nombre = :nombre,
  apellido = :apellido,
  clave = :clave,
  telefono = :telefono,
  direccion = :direccion
  where id = :id`;

async function update(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateSql, user);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
module.exports.update = update;

//----------------------------------------------------------------Para cambio del Estado
const updateStatusSql =
  `update usuario
  set estado_ = :estado_
  where id = :id`;

async function updateStatus(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateStatusSql, user);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
module.exports.updateStatus = updateStatus;

//----------------------------------------------------------------Para cambio del ROL
const updateRolSql =
  `update usuario
  set rol_ = :rol_
  where id = :id`;

async function updateRol(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateRolSql, user);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
module.exports.updateRol = updateRol;

//----------------------------------------------------------------Para cambio del Crédito
const updateCreditoSql =
  `update usuario
  set credito_ = :credito_
  where id = :id`;

async function updateCredito(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateCreditoSql, user);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
module.exports.updateCredito = updateCredito;

//----------------------------------------------------------------Para cambio del Password
const updatePasswordSql =
  `BEGIN
    SAVEPOINT pointClave;
    COMMIT;
    update usuario
    set clave = :clave
    where correo= :correo and nombre= :nombre and apellido= :apellido;
  END;`;

const updatePasswordSelectSql =
  `Select clave "clave" from usuario`;

async function updatePassword(usr) {
  let query = updatePasswordSelectSql;
  const bids = {};
  bids.correo = usr.correo;
  bids.nombre = usr.nombre;
  bids.apellido = usr.apellido;
  bids.clave = usr.clave;
  query += `\nwhere correo= :correo and nombre= :nombre and (apellido= :apellido or clave= :clave)`;
  //console.log("BIDS: ");
  //console.log(bids);
  const result2 = await database.simpleExecute(query, bids);
  //console.log(result2);

  const user = Object.assign({}, usr);
  //console.log(user);
  const result = await database.simpleExecute(updatePasswordSql, user);
  //console.log(result);
  return result2.rows;
}
module.exports.updatePassword = updatePassword;

//----------------------------------------------------------------Para el RollBack
const updateRollbackSql =
  `BEGIN
    ROLLBACK;
    COMMIT;
  END;`;

async function updateRollback(usr) {
  //const user = Object.assign({}, usr);
  console.log("rollback");
  const result = await database.simpleExecute2(updateRollbackSql);
  console.log(result);
  return "user";
}
module.exports.updateRollback = updateRollback;

//-------------------------------------------------------------------Para el Delete
const deleteSql =
  `begin
 
    delete from user
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

const prueba = "ROLLBACK TO SAVEPOINT pointClave;";
