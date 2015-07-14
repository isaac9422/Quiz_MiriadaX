
var users = {admin: {id: 1, username: "admin", password: "1234"}, user: {id: 2, username:"User", password:"5678"}};

exports.autenticar = function(login, pass, callback){
  if(users[login]){
   if(pass == users[login].password){
      callback(null, users[login]);
    }else{
    } 
      callback(new Error('Password erróneo'));
  }else{
    callback(new Error('No existe el usuario'));
  }
};
