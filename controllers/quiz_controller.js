var models = require('../models/models.js');
//autoload
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else { next(new Error('No exites quizId' +quizId));}
    }).catch(function(error){next(error)});
};
//get /quizes
exports.index = function(req, res) {
 if(req.query.search) {
    var filtro  = (req.query.search || '').replace(" ", "%");
    models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(function(quizes){
      res.render('quizes/index', {quizes: quizes, errors: []});
    }).catch(function(error) { next(error);});

  } else {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', {quizes: quizes, errors: []});
    }
  ).catch(function(error){next(error)});
}
};
//get /quizes/:id
exports.show = function(req, res){
      res.render('quizes/show', { quiz: req.quiz});        
};
//get /quizes/:id/answre
exports.answer = function(req, res){
  var resultado ='Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado='Correcto';
    } 
      res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });
  
};
