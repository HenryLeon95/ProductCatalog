const employees = require('../db_apis/employees.js');
 //---------------------------------------------------Funcion GET
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
    console.log(context.id);
 
    const rows = await employees.find(context);
 
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
function getEmployeeFromRec(req) {
  const employee = {
    nombre: req.body.nombre
  };
 
  return employee;
}
 
async function post(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);
 
    employee = await employees.create(employee);
 
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}
module.exports.post = post;

//-------------------------------------------------------FUNCION PUT
async function put(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);
 
    employee.id_prueba = parseInt(req.params.id, 10);
 
    employee = await employees.update(employee);
 
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
 
    const success = await employees.delete(id);
 
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