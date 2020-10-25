const Sequelize = require('sequelize');

//Nome do Banco, Usuario, Senha
const connection = new Sequelize('guiaperguntas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//Exporta para usar em outros modulos
module.exports = connection;