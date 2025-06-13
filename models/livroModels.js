const Sequelize = require('sequelize');
const db = require('../db');

const Livros = db.define('livros', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isbn: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    editora: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: Sequelize.DATE,
        allowNull: false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qtd_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
});

module.exports = Livros;