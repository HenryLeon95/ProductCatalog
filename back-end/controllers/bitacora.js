const bitacora = require('../db_apis/bitacora');
const oracledb = require('oracledb');

//-------------------------------------------------------Insertando en Bitacora
function getUserFromRec(req) {
    const user = {
        usuario_: req.body.usuario_,
        destino_: req.body.destino_,
        tipo: req.body.tipo,
        accion_: req.body.accion_,
    };
    return user;
}

async function post(req, res, next) {
    try {
        let bit = getUserFromRec(req);
        console.log(bit);
        bit = await bitacora.create(bit);
        res.status(201).json(bit);
        //res.status(201).json("bit");
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

module.exports.post2 = async (req, res) => {
    try {
        const {
            usuario_, destino_, tipo, accion_
        } = req.body;

        const conn = await oracledb.getConnection();
        const response = await conn.execute(
            `BEGIN
                llenadoBitacora(:usuario_, :destino_, :tipo, :accion_);
            END;`,
            {
                usuario_, destino_, tipo, accion_
            }
        );
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
}