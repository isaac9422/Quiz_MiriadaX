//GET Question
exports.question = function(req, res){
  res.render('quices/question', { pregunta: 'Capital de Italia' , title: 'Quiz' })	
};

//GET answer
exports.answer = function(req, res){
	if(req.query.resposta.toUpperCase() === "ROMA"){
		res.render('quices/answer', { decision: 'Correcto', title: 'Quiz'  });		
	}else{
		res.render('quices/answer', { decision: 'InCorrecto', title: 'Quiz'  });
	}	
};
