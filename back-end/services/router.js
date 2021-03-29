const express = require('express');
const router = new express.Router();

const employees = require('../controllers/employees.js');
const usercreate = require('../controllers/users.js');
const userStatus = require('../controllers/status');
const userRols = require('../controllers/Rols');
const userCredits = require('../controllers/Credits');
const userPassword = require('../controllers/password');
const categories = require('../controllers/categories');
const products = require('../controllers/productos');
const bitacora = require('../controllers/bitacora');

const users = require('../db_apis/users.js');
const categoria = require('../db_apis/categories');
const pro = require('../db_apis/productos');
const repo = require('../db_apis/reports');

const jwt = require('jsonwebtoken');
const fs = require('fs');
var nodemailer = require('nodemailer');

const secret_key = 'secretkey201503577';
const expiresIn = 24 * 60 * 60;

router.post('/sendEmail', (req, res) => {
  console.log(req.body.correo)
  console.log(req.body.cod_temp);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'henriscoh1995@gmail.com', // Cambialo por tu email
      pass: 'yoyella*123' // Cambialo por tu password
    }
  });
  const mailOptions = {
    from: `”Alie-Sell 👻” <aliesell@aliesell.com>`,
    to: `${req.body.correo}`, // Cambia esta parte por el destinatario
    subject: "Bienvenido a Alie-Sell",
    html: `
      <h1>ALIE-SELL</h1><br/><br/><br/>
      Querido Usuario.<br/><br/>
      Gracias por verificar su dirección de correo electrónico.
      Por favor introduzca el siguiente código en el apartado de verificación de nuestra página.<br/>
      <strong>Código de verificación: </strong> ${req.body.cod_temp} <br/><br/>
      Si usted no se  ha registrado con nosotros, por favor verificar su seguridad e ignorar este mensaje.
      <br/><br/><strong>¡Felices Compras!</strong>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Hubo un error");
      console.log(err);
    }
    else {
      console.log("Dios mio, si funciono");
      console.log(info);
    }
  });

  res.status(200).send();
});

router.post('/sendEmail2', (req, res) => {
  console.log(req.body.correo);
  console.log(req.body.clave);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'henriscoh1995@gmail.com', // Cambialo por tu email
      pass: 'yoyella*123' // Cambialo por tu password
    }
  });
  const mailOptions = {
    from: `”Alie-Sell 👻” <aliesell@aliesell.com>`,
    to: `${req.body.correo}`, // Cambia esta parte por el destinatario
    subject: "Bienvenido a Alie-Sell",
    html: `
      <h1>ALIE-SELL</h1><br/><br/><br/>
      Querido Usuario.<br/><br/>
      Se ha ascendido su cuenta a Administrador.
      Ahora puede ingresar como Administrador con sus credenciales.<br/>
      <strong>Clave de acceso: </strong> ${req.body.clave} <br/><br/>
      Si usted no se  ha registrado con nosotros, por favor verificar su seguridad e ignorar este mensaje.
      <br/><br/><strong>¡Felices Compras!</strong>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Hubo un error");
      console.log(err);
    }
    else {
      console.log("Dios mio, si funciono");
      console.log(info);
    }
  });

  res.status(200).send();
});

router.post('/sendEmail3', (req, res) => {
  console.log(req.body.correo);
  console.log(req.body.clave);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'henriscoh1995@gmail.com', // Cambialo por tu email
      pass: 'yoyella*123' // Cambialo por tu password
    }
  });
  const mailOptions = {
    from: `”Alie-Sell 👻” <aliesell@aliesell.com>`,
    to: `${req.body.correo}`, // Cambia esta parte por el destinatario
    subject: "Bienvenido a Alie-Sell",
    html: `
      <h1>ALIE-SELL</h1><br/><br/><br/>
      Querido Usuario.<br/><br/>
      Su cuenta a cambiado a Servicio de Ayuda.
      Ahora puede ingresar como Servicio de Ayuda con sus credenciales.<br/>
      <strong>Clave de acceso: </strong> ${req.body.clave} <br/><br/>
      Si usted no se  ha registrado con nosotros, por favor verificar su seguridad e ignorar este mensaje.
      <br/><br/><strong>¡Felices Compras!</strong>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Hubo un error");
      console.log(err);
    }
    else {
      console.log("Dios mio, si funciono");
      console.log(info);
    }
  });

  res.status(200).send();
});

router.post('/upload', (req, res) => {
  console.log("Intentando Enviar Imagen");
  const file = req.body.file;
  const name = req.body.name;

  const binaryData = new Buffer(file.replace(/^data:image\/png;base64,/, ""), 'base64').toString('binary');
  fs.writeFile('./images/' + name, binaryData, "binary", (err) => {
    console.log(err);
  });
  fs.writeFile('../front-end/src/assets/' + name, binaryData, "binary", (err) => {
    console.log(err);
  });

  res.json({ result: 'ok' });
});

router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;
  const user = await users.find(correo, clave);
  if (user.length === 1) {
    const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: expiresIn });
    return res.status(200).json({ token, user });
  }
  else {
    return res.status(401).send('ERROR! Verifique sus datos');
  }
});

//Falta crear la página de productos y mostrarlo aquí
router.get('/anonymous', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Camisa',
      Description: 'Camisa talla l'
    },
    {
      id: 2,
      title: 'Juguete',
      Description: 'Carro Honda Civic'
    }
  ])
});

router.route('private')
  .get();

router.get('/private', verifyToken, (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Camisa',
      Description: 'Camisa talla l',
      precio: 20.00
    },
    {
      id: 2,
      title: 'Juguete',
      Description: 'Carro Honda Civic',
      precio: 150.00
    }
  ])
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('No está autorizado para ver esta página');
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('No está autorizado para ver esta página');
  }

  const payload = jwt.verify(token, secret_key);
  req.userId = payload.id;
  next();
}

router.route('/employees/:id?')
  .get(employees.get)
  .post(employees.post)
  .put(employees.put)
  .delete(employees.delete);

router.route('/signup/:id?')
  .post(usercreate.post);

router.route('/user/:id?')
  .get(usercreate.get)
  .put(usercreate.put)
  .delete(usercreate.delete);

router.route('/user/status/:id?')
  .post(userStatus.post)
  .put(userStatus.put);

router.route('/user/rol/:id?')
  .put(userRols.put);

router.route('/user/credit/:id?')
  .put(userCredits.put);

router.route('/user/password')
  .post(userPassword.post);


router.post('/user/search', async (req, res) => {
  const { correo, clave } = req.body;
  console.log("antes");
  const user = await users.find(correo, clave);
  console.log(user);
  if (user.length === 1) {
    return res.status(200).json(user);
  }
  else {
    return res.status(401).send('ERROR! Verifique sus datos');
  }
});

router.post('/category', async (req, res) => {
  const { usuario_ } = req.body;
  const rows = await categoria.find(usuario_);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/category2', async (req, res) => {
  const { usuario_, padre } = req.body;
  const rows = await categoria.find(usuario_, padre);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/category3', async (req, res) => {
  const rows = await categoria.find3();

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/category4', async (req, res) => {
  const { nombre_categoria } = req.body;
  const rows = await categoria.find4(nombre_categoria);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.route('/categories/:id?')
  .get(categories.get)
  .post(categories.post)
  .put(categories.put)
  .delete(categories.delete);

router.route('/product/:id?')
  .post(products.post)
  .put(products.put)
  .delete(products.delete);

router.route('/bitacoras')
  .post(bitacora.post2);

router.route('/bitacora/:id?')
  .post(bitacora.post);

router.post('/getProduct', async (req, res) => {
  const { usuario_, id, codigo, categoria_ } = req.body;
  //const { usuario_, categoria_ } = req.body;
  console.log(req.body);
  const rows = await pro.find(usuario_, id, codigo, categoria_);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/getProduct2', async (req, res) => {
  const { nombre_categoria, nombre, orden1, orden2 } = req.body;
  //console.log(req.body);
  const rows = await pro.find2(nombre_categoria, nombre, orden1, orden2);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report', async (req, res) => {
  const { fecha_nacimiento } = req.body;
  console.log(req.body);
  const rows = await repo.find(fecha_nacimiento);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report3', async (req, res) => {
  const { fecha_nacimiento } = req.body;
  console.log(req.body);
  const rows = await repo.find3(fecha_nacimiento);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report4', async (req, res) => {
  const rows = await repo.find4();

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report7', async (req, res) => {
  const rows = await repo.find7();

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report8', async (req, res) => {
  const rows = await repo.find8();

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

module.exports = router;

router.post('/report10', async (req, res) => {
  const { cantidad_disponible } = req.body;
  console.log(req.body);
  const rows = await repo.find10(cantidad_disponible);

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});

router.post('/report12', async (req, res) => {
  const rows = await repo.find12();

  if (rows == null || rows.length === 0) {
    res.status(200).json("vacio");
  }
  else {
    res.status(200).json(rows);
  }
});
