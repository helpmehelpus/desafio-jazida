const bodyParser = require('body-parser');
const express = require('express');
const batalhas = require('./routes/batalhas.router');
const pokemons = require('./routes/pokemon.router');
const logger = require('./utils/logger');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Running server on port ${PORT}`);
});

app.use('/batalhar', batalhas);
app.use('/pokemons', pokemons);

module.exports = app;
