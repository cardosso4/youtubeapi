const Sequelize = require("sequelize");
const databse = require("../db");

const Usuario = databse.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true 
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    sobrenome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    telefone:{
        type: Sequelize.STRING,
    }
});

module.exports = Usuario;