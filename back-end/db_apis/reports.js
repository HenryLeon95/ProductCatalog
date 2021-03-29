const database = require('../services/database.js');
const oracledb = require('oracledb');

//---------------------------------------------------Para el GET
const baseQuery =
    `select id "id", nombre "nombre", apellido "apellido", clave "clave", correo "correo",
        telefono "telefono", fotografia "fotografia", genero "genero", fecha_nacimiento "fecha_nacimiento",
        fecha_registro "fecha_registro", direccion "direccion", credito_ "credito_", ganancia "ganancia",
        rol_ "rol_", estado_ "estado_"
    from Usuario`;

const baseQuery7 =
    `Select *from (
        Select u.nombre "nombre", u.apellido "apellido", count(*) as cantidad from usuario u, producto p
        where u.rol_ = 3 AND u.id = p.usuario_
        group by u.nombre, u.apellido
        order by cantidad desc)
        where rownum <=3`;

const baseQuery8 =
    `Select p.codigo, p.nombre "nombre", c.nombre_categoria "nombre_categoria",
        c.padre "padre", c.usuario_ "usuario_" from producto p, categoria c
    where p.categoria_ = c.id`;

const baseQuery10 =
    `select id "id", codigo "codigo", nombre "nombre", imagen "imagen", descripcion "descripcion", categoria_ "categoria_",
        precio "precio", color "color", fecha_publicacion "fecha_publicacion", cantidad_disponible "cantidad_disponible",
        usuario_ "usuario_"
    from Producto`;

const baseQuery12 =
    `Select u.nombre "nombre", u.apellido "apellido", b.tipo "tipo", b.accion_ "accion_", b.fecha "fecha"
        from usuario u, bitacora b
        where b.usuario_ = u.id`;

/*
Select *from (
    Select u.nombre "nombre", u.apellido "apellido", count(*) as cantidad "cantidad" from usuario u, producto p
    where u.rol_ = 3 AND u.id = p.usuario_
    group by u.nombre
    order by cantidad desc)
where rownum <=3
*/

async function find(fecha_nacimiento) {
    let query = baseQuery;
    const binds = {};

    if (fecha_nacimiento) {
        binds.fecha_nacimiento = fecha_nacimiento;

        query += `\nwhere genero = 'M' AND rol_ = 2 AND :fecha_nacimiento< fecha_nacimiento`;
    }

    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
module.exports.find = find;

async function find3(fecha_nacimiento) {
    let query = baseQuery;
    const binds = {};

    if (fecha_nacimiento) {
        binds.fecha_nacimiento = fecha_nacimiento;

        query += `\nwhere genero = 'F' AND rol_ = 1 AND :fecha_nacimiento> fecha_nacimiento`;
    }

    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
module.exports.find3 = find3;

async function find4() {
    let query = baseQuery;
    query += `\nOrder by ganancia desc`;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
module.exports.find4 = find4;

async function find7() {
    let query = baseQuery7;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    console.log(result);
    return result.rows;
}
module.exports.find7 = find7;

async function find8() {
    let query = baseQuery8;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    console.log(result);
    return result.rows;
}
module.exports.find8 = find8;

async function find10(cantidad_disponible) {
    let query = baseQuery10;
    const binds = {};

    if (cantidad_disponible) {
        binds.cantidad_disponible = cantidad_disponible;
        query += `\nWhere cantidad_disponible = :cantidad_disponible`;
    }

    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
module.exports.find10 = find10;

async function find12() {
    let query = baseQuery12;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    //console.log(result);
    return result.rows;
}
module.exports.find12 = find12;