/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const Pokemon = require('../models/pokemon');

const logger = require('../utils/logger');

class Pokemons {
  async criar(objetoPokemon) {
    if (objetoPokemon.tipo !== 'charizard' && objetoPokemon.tipo !== 'mewtwo' && objetoPokemon.tipo !== 'pikachu') {
      logger.error(`Pokemons - Erro ao tentar criar pokemon de tipo ${objetoPokemon.tipo} invalido`);
      throw { code: 400, message: `Tipo ${objetoPokemon.tipo} invalido.` };
    }
    let pokemon;
    try {
      pokemon = await Pokemon.create({
        tipo: objetoPokemon.tipo,
        treinador: objetoPokemon.treinador,
        nivel: 1,
      });
    } catch (err) {
      logger.error('Pokemons - Erro ao tentar criar pokemon');
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return pokemon;
  }

  async alterar(pokemonId, novoTreinador) {
    let pokemon;
    try {
      pokemon = await this.carregar(pokemonId);
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar alterar pokemon com id: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    pokemon.treinador = novoTreinador;
    try {
      await pokemon.save();
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar alterar pokemon com id: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return { code: 204 };
  }

  async deletar(pokemonId) {
    let pokemon;
    try {
      pokemon = await this.carregar(pokemonId);
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar deletar pokemon com id: ${err}`);
      throw { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    try {
      await pokemon.destroy();
      logger.warn(`Pokemons - pokemon com id ${pokemonId} sendo destruido`);
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar deletar pokemon com id: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return { code: 204 };
  }

  async carregar(pokemonId) {
    let pokemon;
    try {
      pokemon = await Pokemon.findByPk(pokemonId, { rejectOnEmpty: true });
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar carregar pokemon com id: ${err}`);
      throw { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    return pokemon;
  }

  async listar() {
    let listaPokemons;
    try {
      listaPokemons = await Pokemon.findAll();
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar carregar lista de pokemons: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return listaPokemons;
  }

  async incrementaNivel(pokemonId) {
    let pokemon;
    try {
      pokemon = await this.carregar(pokemonId);
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar incrementar nivel de pokemon com id: ${err}`);
      throw { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    pokemon.nivel += 1;
    try {
      await pokemon.save();
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar incrementar nivel de pokemon com id: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return pokemon;
  }

  async decrementaNivel(pokemonId) {
    let pokemon;
    try {
      pokemon = await this.carregar(pokemonId);
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar decrementar nivel de pokemon com id: ${err}`);
      throw { code: 404, message: `Pokemon com id ${pokemonId} nao encontrado.` };
    }
    pokemon.nivel -= 1;
    if (pokemon.nivel === 0) {
      logger.info(`Pokemon ${pokemonId} morreu. Deletando`);
      const pokemonMorto = pokemon;
      await this.deletar(pokemonId);
      return pokemonMorto;
    }
    try {
      await pokemon.save();
    } catch (err) {
      logger.error(`Pokemons - Erro ao tentar decrementar nivel de pokemon com id: ${err}`);
      throw { code: 500, message: 'Erro interno do servidor' };
    }
    return pokemon;
  }
}

module.exports = Pokemons;
