const database = require('../services/database.js');
const oracledb = require('oracledb');

//------------------------------------------------------------Para el Post
const createSql =
    `insert into Producto(codigo, nombre, imagen, descripcion, categoria_, precio, color, cantidad_disponible, usuario_)
        values (:codigo, :nombre, :imagen, :descripcion, :categoria_, :precio, :color, :cantidad_disponible, :usuario_)
        returning id
    into :id`;

async function create(newpro) {
    const pro = Object.assign({}, newpro);

    pro.id = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }

    const result = await database.simpleExecute(createSql, pro);
    pro.id = result.outBinds.id[0];
    return pro;
}
module.exports.create = create;

//---------------------------------------------------Para el GET
const baseQuery =
    `select id "id", codigo "codigo", nombre "nombre", imagen "imagen", descripcion "descripcion", categoria_ "categoria_",
        precio "precio", color "color", fecha_publicacion "fecha_publicacion", cantidad_disponible "cantidad_disponible",
        usuario_ "usuario_"
  from Producto`;
/*
const baseQuery2 =
  `select distinct p.id "id", p.codigo "codigo", p.nombre "nombre", p.imagen "imagen", p.descripcion "descripcion", p.categoria_ "categoria_",
    p.precio "precio", p.color "color", p.fecha_publicacion "fecha_publicacion", p.cantidad_disponible "cantidad_disponible",
    p.usuario_ "usuario_", u.nombre "u_nombre", u.apellido "u_apellido"
  from Producto p, categoria g, usuario u`;*/

const baseQuery2 =
  `select p.id "id", p.codigo "codigo", p.nombre "nombre", p.imagen "imagen", p.descripcion "descripcion", p.categoria_ "categoria_",
    p.precio "precio", p.color "color", p.fecha_publicacion "fecha_publicacion", p.cantidad_disponible "cantidad_disponible",
    p.usuario_ "usuario_", u.nombre "u_nombre", u.apellido "u_apellido"
  from Producto p, usuario u
  where p.categoria_ in (select id from categoria`;

async function find(usuario_, id, codigo, categoria_) {
    let query = baseQuery;
    const binds = {};

    if (usuario_ && id && codigo && categoria_) {
        binds.usuario_ = usuario_;
        binds.id = id;
        binds.codigo = codigo;
        binds.categoria_ = categoria_;

        query += `\nwhere usuario_= :usuario_ AND id= :id AND codigo= :codigo AND categoria_= :categoria_`;
    }
    else if (usuario_ && categoria_) {
        binds.usuario_ = usuario_;
        binds.categoria_ = categoria_;

        query += `\nwhere usuario_= :usuario_ AND categoria_= :categoria_`;
    }
    else if (usuario_) {
        binds.usuario_ = usuario_;

        query += `\nwhere usuario_= :usuario_`;
    }
    else if (categoria_) {
        binds.categoria_ = categoria_;

        query += `\nwhere categoria_= :categoria_`;
    }
    else if (codigo) {
        binds.codigo = codigo;

        query += `\nwhere codigo= :codigo`;
    }
    else if (id) {
        binds.id = id;

        query += `\nwhere id= :id`;
    }

    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
module.exports.find = find;

async function find2(nombre_categoria, nombre, orden1, orden2) {
  let query = baseQuery2;
  const binds = {};
  nombre_categoria = "%" + nombre_categoria + "%";
  nombre = "%" + nombre + "%";
  binds.nombre_categoria = nombre_categoria;
  binds.nombre = nombre;

  if(orden1 && orden2){
    query += `\nwhere nombre_categoria LIKE :nombre_categoria) and p.nombre LIKE :nombre and u.id = p.usuario_`;

    if(orden1 == "precio"){
      query += `\norder by p.precio`;
    }
    else{
      query += `\norder by p.fecha_publicacion`;
    }
    if(orden2 == "desc"){
      query += `\ndesc`;
    }
    else{
      query += `\nasc`;
    }
    //query += `\norder by p.precio desc`;
    console.log(query);
  }
  else{
    //query += `\nwhere g.nombre_categoria LIKE :nombre_categoria and p.nombre LIKE :nombre and u.id = p.usuario_`;
    query += `\nwhere nombre_categoria LIKE :nombre_categoria) and p.nombre LIKE :nombre and u.id = p.usuario_`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
module.exports.find2 = find2;

//----------------------------------------------------------------Para el Update
const updateSql =
 `update Producto
  set codigo = :codigo, nombre = :nombre, descripcion = :descripcion, precio = :precio,
  cantidad_disponible = :cantidad_disponible, color = :color
  where id = :id`;
 
async function update(newpro) {
  const pro = Object.assign({}, newpro);
  const result = await database.simpleExecute(updateSql, pro);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return pro;
  } else {
    return null;
  }
}
module.exports.update = update;

//-------------------------------------------------------------------Para el Delete
const deleteSql =
 `begin
 
    delete from Producto
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