/* eslint-disable class-methods-use-this */
const Pokemons = require('./pokemons');

const pokemons = new Pokemons();
const logger = require('../utils/logger');

class Batalhas {
  async batalhar(pokemonAId, pokemonBId) {
    let pokemonA; let
      pokemonB;
    try {
      pokemonA = await pokemons.carregar(pokemonAId);
      pokemonB = await pokemons.carregar(pokemonBId);
    } catch (err) {
      logger.error(`Batalhas - Erro ao tentar iniciar batalha entre Pokemons ${pokemonAId} e ${pokemonAId}: ${err}`);
      throw err;
    }
    const result = this.calculaResultadoBatalha(pokemonA, pokemonB);
    return result;
  }

  async calculaResultadoBatalha(pokemonA, pokemonB) {
    const chanceVitoriaDeA = pokemonA.nivel / (pokemonA.nivel + pokemonB.nivel);
    const sorteio = Math.random();
    let pokemonAAtualizado;
    let pokemonBAtualizado;
    let result;
    try {
      if (sorteio <= chanceVitoriaDeA) {
        logger.info(`Pokemon ${pokemonA.id} vence a batalha contra Pokemon ${pokemonB.id}`);
        pokemonAAtualizado = await pokemons.incrementaNivel(pokemonA.id);
        pokemonBAtualizado = await pokemons.decrementaNivel(pokemonB.id);
        result = {
          vencedor: pokemonAAtualizado,
          perdedor: pokemonBAtualizado,
        };
      }
      logger.info(`Pokemon ${pokemonB.id} vence a batalha contra Pokemon ${pokemonA.id}`);
      pokemonBAtualizado = await pokemons.incrementaNivel(pokemonB.id);
      pokemonAAtualizado = await pokemons.decrementaNivel(pokemonA.id);
      result = {
        vencedor: pokemonBAtualizado,
        perdedor: pokemonAAtualizado,
      };
    } catch (err) {
      logger.error('Batalhas - Erro ao tentar calcular resultado da batalha');
      throw (err);
    }
    return result;
  }
}

module.exports = Batalhas;
