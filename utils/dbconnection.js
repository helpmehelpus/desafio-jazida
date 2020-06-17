const Sequelize = require('sequelize');
const credentials = require('../config/keys');

const connection = new Sequelize(credentials.dbName, credentials.dbUser, credentials.dbPassword,
  {
    host: credentials.dbHost,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  });

connection.authenticate()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
  });

module.exports = connection;
