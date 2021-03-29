const users = require('../db_apis/users.js');
const oracledb = require('oracledb');

//-------------------------------------------------------FUNCION PUT de Estado
function getUserFromRec2(req) {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        correo: req.body.correo,
    };
    return user;
}/*
module.exports.post = async (req, res)=>{
    try{
        const {
            nombre, apellido, clave, correo
        } = req.body;
        console.log(req.body);

        const conn = await oracledb.getConnection();
        const response = await conn.execute(
            `BEGIN
                SAVEPOINT pointClave;
                claveTemporal(:clave, :nombre, :apellido, :correo);
            END;`,
                {
                    clave, nombre, apellido, correo
                }
        );
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
}*/

async function post(req, res, next) {
    try {
        let usr = getUserFromRec2(req);
        usr = await users.updatePassword(usr);
        console.log(usr);
        if (usr !== null) {
            res.status(200).json(usr[0]);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;