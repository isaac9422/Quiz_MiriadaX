var models = require('../models/models.js');

//GET Question
exports.question = function(req, res){
  models.Quiz.findAll().then(function(quiz){  
	res.render('quices/question', { pregunta: quiz[0].pergunta , title: 'Quiz' })
  })	
};

//GET answer
exports.answer = function(req, res){
  models.Quiz.findAll().then(function(quiz){  
	if(req.query.resposta.toUpperCase() === "ROMA"){
		res.render('quices/answer', { decision: 'Correcto', title: 'Quiz'  });		
	}else{
		res.render('quices/answer', { decision: 'InCorrecto', title: 'Quiz'  });
	}	
 })
};
