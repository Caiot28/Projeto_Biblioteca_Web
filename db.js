const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Projeto_Biblioteca_Web/database.sqlite'
});

module.exports = sequelize;
