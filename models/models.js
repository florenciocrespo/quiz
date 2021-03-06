// Modelos ORM
var path = require('path');

//Postgres DATABASE_URL = postgres://user:/passwd@host:port/database
//SQlite DATABASE_URL = sqlite://:@/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
console.log(DB_name+" "+user+" "+pwd+" "+protocol+" "+dialect);

var Sequelize = require('sequelize');

//Usar BBDD SQlite o Postgres

var sequelize = new Sequelize(DB_name,user,pwd,
                    { dialect: protocol,
                      protocol:protocol,
                      port: port,
                      host: host,
                      storage: storage, //solo SQlite(.env)
                      omitNull: true    //solo Postgress
                  }


                    );

// Usar BBDD SQLite:
/*var sequelize = new Sequelize(null, null, null, 
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );*/

// Importar la definicion de la clase Quiz desde quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
//var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;



// sequelize.sync() crea las tablas de datos definidas en el modelo
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creadas las tabas de la DB
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: '¿Cual es la capital de Italia?',
                    respuesta: 'Roma'
                 });
      Quiz.create({ pregunta: '¿Cual es la capital de Portugal?',
                    respuesta: 'Lisboa'
                 })
      .then(function(){console.log('Base de datos inicializada .')});
    };
  });
});