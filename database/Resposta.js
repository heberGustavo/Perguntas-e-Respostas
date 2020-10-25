const { Sequelize } = require('sequelize');
const Serialize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas',{
    nome:{
        type: Serialize.STRING,
        allowNull: false
    },
    corpo: {
        type: Serialize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Serialize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;