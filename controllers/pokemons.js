/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const Pokemon = require('../models/pokemon');

class Pokemons {
  async criar(objetoPokemon) {
    if (objetoPokemon.tipo !== 'charizard' && objetoPokemon.tipo !== 'mewtwo' && objetoPokemon.tipo !== 'pikachu') {
      throw { code: 400, message: `Tipo ${objetoPokemon.tipo} invalido.` };
    }
    const pokemon = await Pokemon.create({
      tipo: objetoPokemon.tipo,
      treinador: objetoPokemon.treinador,
      nivel: 1,
    });
    return pokemon;
  }

  async alterar(pokemonId, novoTreinador) {
    const pokemon = await this.carregar(pokemonId);
    if (!pokemon.id) {
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
    const pokemon = await this.carregar(pokemonId);
    if (!pokemon.id) {
      return { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    await pokemon.destroy();
    return { code: 204 };
  }

  async carregar(pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
      throw { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    return pokemon;
  }

  async listar() {
    const listaPokemons = await Pokemon.findAll();
    if (!listaPokemons) {
      return { code: 404, message: 'Nao foi possivel carregar lista de pokemons' };
    }
    return listaPokemons;
  }

  async incrementaNivel(pokemonId) {
    const pokemon = await this.carregar(pokemonId);
    if (!pokemon.id) {
      return { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    pokemon.nivel += 1;
    await pokemon.save();
    return pokemon;
  }

  async decrementaNivel(pokemonId) {
    const pokemon = await this.carregar(pokemonId);
    if (!pokemon.id) {
      return { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    pokemon.nivel -= 1;
    if (pokemon.nivel === 0) {
      console.log(`Pokemon ${pokemonId} morreu!`);
      const pokemonMorto = pokemon;
      await pokemon.destroy();
      return pokemonMorto;
    }
    await pokemon.save();
    return pokemon;
  }
}

module.exports = Pokemons;
