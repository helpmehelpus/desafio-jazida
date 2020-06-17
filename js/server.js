const bodyParser = require('body-parser');
const express = require('express');
const batalhas = require('./routes/batalhas.router');
const pokemons = require('./routes/pokemon.router');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.listen(8000, () => {
  console.log('Running server on port 8000');
});

app.use('/batalhar', batalhas);
app.use('/pokemons', pokemons);

module.exports = app;
