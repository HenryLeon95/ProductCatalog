const users = require('../db_apis/users.js');

//--------------------------------------------------Funcion POST
function getUserFromRec(req) {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        correo: req.body.correo,
        telefono: req.body.telefono,
        fotografia: req.body.fotografia,
        genero: req.body.genero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        direccion: req.body.direccion,
        credito_: req.body.credito_,
        rol_: req.body.rol_,
        estado_: req.body.estado_,
    };
    return user;
}

function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
}

async function post(req, res, next) {

    try {
        req.body.fecha_nacimiento = formato(req.body.fecha_nacimiento);
        console.log(req.body.fecha_nacimiento);
        let user = getUserFromRec(req);

        if (req.body.fecha_nacimiento == '' || req.body.fecha_nacimiento == "" || req.body.fecha_nacimiento == null) {
            user = await users.create(user);
        }
        else {
            user = await users.create(user);
        }
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }

}
module.exports.post = post;


//---------------------------------------------------Funcion GET
async function get(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.params.id, 10);
        console.log(context.id);
        const rows = await users.findUSer(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

//-------------------------------------------------------FUNCION PUT
function getUserFromRec2(req) {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    };
    return user;
}

async function put(req, res, next) {
    try {
        let usr = getUserFromRec2(req);
        usr.id = parseInt(req.params.id, 10);
        usr = await users.update(usr);

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

//--------------------------------------------------Funcion DELET
async function del(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        const success = await users.delete(id);

        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;