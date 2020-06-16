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

  async alterar(pokemonId, novoTreinador) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
      return { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    if (pokemon.treinador === novoTreinador) {
      return pokemon;
    }
    pokemon.treinador = novoTreinador;
    await pokemon.save();
    return { code: 204 };
  }

  async deletar(pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
      return { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    await pokemon.destroy();
    return { code: 204 };
  }
}

module.exports = Pokemons;
