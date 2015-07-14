
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new',{errors: errors});
};

exports.create = function(req, res){
  var login = req.body.login;
  var pass = req.body.password;
  
  var userController = require('./user_controller');
  userController.autenticar(login, pass, function(err, user){
    if(err){
      req.session.errors = [{"message": "Se han producido errores"+err}];
      res.redirect('/login');
      return;
    }
    req.session.user = {id: user.id, username: user.username};
    var s = req.session.redir.toString() || "";
    res.redirect(s);
  });
}

exports.destroy = function(req, res){
  delete req.session.user;
  res.redirect(req.session.redir.toString());
};

exports.loginRequired = function(req, res, next){
  if(req.session.user){
  	next();
  }else{
  	res.redirect('/login');
  }
};
