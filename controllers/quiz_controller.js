var models = require('../models/models.js');
/*
// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
};

*/

// findAll(quiz) devuelve todos los objetos de la tabla
// como solo hay una pregunta, está será quiz[0] 
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};

exports.answer = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'La respuesta es: ' + quiz[0].respuesta});
    }
  })
};

// GET /author

exports.autor = function(req, res) {
      res.render('autor', {title:'Quiz', autor: 'Florencio Crespo'});
};