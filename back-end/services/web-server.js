//El módulo http se incluye con Node.js pero el módulo express deberá instalarse a través de npm.
const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
//const database = require('./database.js');
const router = require('./router.js');
 
let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
        //Se invocara cuando se reciba dicha solicitus y res, "respuesta", es par aenviar una respuesta al cliente.
    //app.use(morgan('combined'));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.urlencoded({limit: '50mb', extended: false}));

    app.use(bodyparser.json({limit: '50mb', extended: true}));
    //app.use(bodyParser.json({limit: '10mb', extended: true}));
    //app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    app.use(express.json({
      reviver: reviveJson
    }));
    app.use('/api', router);
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
        //Método para escuchar.
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  //if (typeof value === 'string' && iso8601RegExp.test(value)) {
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}