
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz', {
		pergunta: DataTypes.STRING,
		resposta: DataTypes.STRING,}
	);
}
