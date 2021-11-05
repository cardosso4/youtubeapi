const Sequelize = require("sequelize");
const databse = require("../db");

const Videos = databse.define('videos',{
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
    titulo:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    video:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

module.exports = Videos;