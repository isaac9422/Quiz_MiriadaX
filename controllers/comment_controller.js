var models = require('../models/models.js');

//GET answer
exports.load = function(req, res, next, commentId){
  models.Comment.find({where: {id: Number(commentId)}}).then(function(comment){
  	if(comment){
  	  req.comment = comment;
  	  next();
  	}
  	else{
  	   next(new Error('No existe CommentId = '+commentId));
  	}  
 }).catch(function(error){next(error);});
};

exports.new = function(req, res){
  res.render('comments/new', {quizId: req.params.quizId, errors: []});
};

exports.create = function(req, res){
  var comment = models.Comment.build({texto: req.body.comment.texto, QuizId: req.params.quizId});
  comment.validate().then(function(err){
  	if(err){
  		res.render('comments/new', {comment: comment, quizId: req.params.quizId, errors: err.errors});	
  	}else{
	  comment.save().then(function(){res.redirect('/quices/'+req.params.quizId)});
  	}
  }).catch(function(err){next(err)});
};

exports.publish = function(req, res){
  req.comment.publicado = true;
  req.comment.save({fields: ["publicado"]}).then(function(){res.redirect('/quices/'+req.params.quizId);}).catch(function(err){next(err)});
};
