const Sequelize = require('sequelize')
const connection = require('./database');

//Criação da Model
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Sincroniza com o banco de dados
Pergunta.sync({
    force: false /* Se a tabela já existir não força a criacao dela */
}).then(() => {
    // console.log("Tabela criada");
})

module.exports = Pergunta;