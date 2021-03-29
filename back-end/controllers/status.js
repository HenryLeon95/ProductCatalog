const users = require('../db_apis/users.js');

//-------------------------------------------------------FUNCION PUT de Estado
function getUserFromRec2(req) {
    const user = {
        estado_: req.body.estado_
    };
    return user;
}

async function put(req, res, next) {
    try {
        let usr = getUserFromRec2(req);
        usr.id = parseInt(req.params.id, 10);
        usr = await users.updateStatus(usr);

        if (usr !== null) {
            res.status(200).json(usr);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;

//-------------------------------------------------------FUNCION POST para el RollBack
function getUserFromRec(req) {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        correo: req.body.correo,
    };
    return user;
}

async function post(req, res, next) {
    try {
        console.log(req.body);
        
        usr = await users.updateRollback();

        if (usr !== null) {
            res.status(200).json(usr);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;