/* eslint-disable class-methods-use-this */
const Pokemon = require('../models/pokemon');

class Pokemons {
  async criar(objetoPokemon) {
    if (objetoPokemon.tipo !== 'charizard' && objetoPokemon.tipo !== 'mewtwo' && objetoPokemon.tipo !== 'pikachu') {
      return { code: 400, message: `Tipo ${objetoPokemon.tipo} invalido.` };
    }
    const pokemon = await Pokemon.create({
      tipo: objetoPokemon.tipo,
      treinador: objetoPokemon.treinador,
      nivel: 1,
    });
    return pokemon;
  }
}

module.exports = Pokemons;
