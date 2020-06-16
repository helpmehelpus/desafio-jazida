const Sequelize = require('sequelize');

const connection = new Sequelize('Desafio-jz', 'DesafioAdmin', 'Picachu123',
  {
    host: 'jzd-dev-desafio.database.windows.net',
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
