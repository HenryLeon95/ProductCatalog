const users = require('../db_apis/users.js');
const jwt = require('jsonwebtoken');
const secret_key = 'secretkey201503577';
const expiresIn = 24*60*60;

//--------------------------------------------------Funcion LOGIN
async function post(req, res, next) {
    try {
        const context = {};

        context.correo = req.params.correo;
        context.clave = req.params.clave;
        console.log(context.correo);
        console.log(context.clave);

        const user = await users.find(context);

        if (user.length === 1) {
            const token = jwt.sign({id: user.id}, secret_key, {expiresIn: expiresIn});
            //res.status(200).json(user[0]);
            return res.status(200).json({token});
        }
        else {
            return res.status(401).send('ERROR! Verifique sus datos');
        }
    }
    catch (err) {
        next(err);
    }
}
module.exports.post = post;
