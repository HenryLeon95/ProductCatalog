const categories = require('../db_apis/categories');
//---------------------------------------------------Funcion GET
async function get(req, res, next) {
    try {
      const context = {};
      context.id = parseInt(req.params.id, 10);
      const rows = await categories.find2(context);
   
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

//--------------------------------------------------Funcion POST
function getCategoryFromRec(req) {
    const categoria = {
        nombre_categoria: req.body.nombre_categoria,
        descripcion: req.body.descripcion,
        padre: req.body.padre,
        usuario_: req.body.usuario_,
    };
    return categoria;
}

async function post(req, res, next) {
    try {
        let categoria = getCategoryFromRec(req);
        categoria = await categories.create(categoria);
        res.status(201).json(categoria);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

//-------------------------------------------------------FUNCION PUT
function getCategoryFromRec2(req) {
    const categoria = {
        nombre_categoria: req.body.nombre_categoria,
        descripcion: req.body.descripcion,
    };
    return categoria;
}

async function put(req, res, next) {
    try {
      let employee = getCategoryFromRec2(req);
   
      employee.id = parseInt(req.params.id, 10);
   
      employee = await categories.update(employee);
   
      if (employee !== null) {
        res.status(200).json(employee);
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
   
      const success = await categories.delete(id);
   
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