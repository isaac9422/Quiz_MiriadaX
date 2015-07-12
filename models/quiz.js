
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz', {
		pergunta: {type: DataTypes.STRING,
			validate: {notEmpty: {msg: "Pergunta nao pode estar vacio"}}
		},
		resposta: {type: DataTypes.STRING,
			validate: {notEmpty: {msg: "Resposta nao pode estar vacio"}}
		}
	}
	);
}
