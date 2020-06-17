const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbconnection');

const Pokemon = dbConnection.define('Pokemons', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: Sequelize.STRING },
  treinador: { type: Sequelize.STRING },
  nivel: { type: Sequelize.INTEGER },
}, {
  timestamps: false,
  schema: 'ADRIANO',
});

module.exports = Pokemon;
