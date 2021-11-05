const Sequelize = require("sequelize");
const databse = require("../db");

const Historico = databse.define('historico',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKeyConstraint: true 
    },
    pesquisa:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Historico;