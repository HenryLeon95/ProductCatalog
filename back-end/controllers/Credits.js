const users = require('../db_apis/users.js');

//-------------------------------------------------------FUNCION PUT de Credito
function getUserFromRec2(req) {
    const user = {
        credito_: req.body.credito_
    };
    return user;
}

async function put(req, res, next) {
    try {
        let usr = getUserFromRec2(req);
        usr.id = parseInt(req.params.id, 10);
        usr = await users.updateCredito(usr);

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