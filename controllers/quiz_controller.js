var models = require('../models/models.js');

//GET answer
exports.load = function(req, res, next, quizId){
  models.Quiz.findById(quizId).then(function(quiz){
  	if(quiz){
  	  req.quiz = quiz;
  	  next();
  	}
  	else{
  	   next(new Error('No existe quizId = '+quizId));
  	}  
 }).catch(function(error){next(error);});
};


//GET answer
exports.index = function(req, res){
	
  var str = "%" + req.query.search + "%";
  var find = ' ';
  var re = new RegExp(find, 'g', 'i');
  var und = new RegExp('undefined', 'g', 'i');
  str = str.replace(re, '%');
  str = str.replace(und, '');
    
  models.Quiz.findAll({where: ["pergunta like ?", str], order: "pergunta"}).then(function(quices){  
	res.render('quices/index', { quices: quices, errors: []});
 })
};

//GET Question
exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){  
	res.render('quices/show', { quiz: req.quiz, errors: [] });
  })	
};

//GET answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){  
	if(req.query.resposta.toUpperCase() === req.quiz.resposta.toUpperCase()){
		res.render('quices/answer', { quiz: req.quiz, resposta: 'Correcto', errors: [] });		
	}else{
		res.render('quices/answer', { quiz: req.quiz,  resposta: 'InCorrecto', errors: []  });
	}	
 })
};

exports.new = function(req, res){
  var quiz = models.Quiz.build({pergunta: "", resposta: "", tematica: ""});
  res.render('quices/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate().then(function(err){
  	if(err){
  		res.render('quices/new', {quiz: quiz, errors: err.errors});	
  	}else{
	  quiz.save({fields: ["pergunta", "resposta", "tematica"]}).then(function(){res.redirect('/quices');})
  	}
  });
};

exports.edit = function(req, res){
  var quiz = req.quiz;
  res.render('quices/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res){
  req.quiz.pergunta = req.body.quiz.pergunta;
  req.quiz.resposta = req.body.quiz.resposta;
  req.quiz.tematica = req.body.quiz.tematica;
  
  req.quiz.validate().then(function (err){
    if(err){
      res.render('quices/edit', {quiz: req.quiz, errors: err.errors});
    }else{
      req.quiz.save({fields: ["pergunta", "resposta", "tematica"]}).then(function (){
        res.redirect('/quices');
      });
    }
  }
  );
};

exports.destroy = function(req, res){
   req.quiz.destroy().then(function(){
      res.redirect('/quices');
   }).catch(function(err){next(error)});
};
