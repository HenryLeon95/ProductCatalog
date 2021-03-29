const productos = require('../db_apis/productos');

//--------------------------------------------------Funcion POST
function getStoreFromRec(req) {
    const producto = {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        categoria_: req.body.categoria_,
        precio: req.body.precio,
        color: req.body.color,
        cantidad_disponible: req.body.cantidad_disponible,
        usuario_: req.body.usuario_,
    };
    return producto;
}

async function post(req, res, next) {
    try {
        console.log("Entrando");
        let producto = getStoreFromRec(req);
        producto = await productos.create(producto);
        res.status(201).json(producto);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

//-------------------------------------------------------FUNCION PUT
function getCategoryFromRec2(req) {
    const producto = {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        color: req.body.color,
        cantidad_disponible: req.body.cantidad_disponible,
    };
    return producto;
}

async function put(req, res, next) {
    try {
      let pro = getCategoryFromRec2(req);
      pro.id = parseInt(req.params.id, 10);
      pro = await productos.update(pro);
   
      if (pro !== null) {
        res.status(200).json(pro);
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
   
      const success = await productos.delete(id);
   
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