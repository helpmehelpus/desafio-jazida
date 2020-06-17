/* eslint-disable class-methods-use-this */
const Pokemons = require('./pokemons');

const pokemons = new Pokemons();

class Batalhas {
  async batalhar(pokemonAId, pokemonBId) {
    const pokemonA = await pokemons.carregar(pokemonAId);
    if (!pokemonA.id) {
      return { code: 404, message: `Pokemon com id ${pokemonAId} nao encontrado.` };
    }
    const pokemonB = await pokemons.carregar(pokemonBId);
    if (!pokemonB.id) {
      return { code: 404, message: `Pokemon com id ${pokemonBId} nao encontrado.` };
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
    if (sorteio <= chanceVitoriaDeA) {
      console.log(`Pokemon ${pokemonA.id} vence`);
      pokemonAAtualizado = await pokemons.incrementaNivel(pokemonA.id);
      pokemonBAtualizado = await pokemons.decrementaNivel(pokemonB.id);
      result = {
        vencedor: pokemonAAtualizado,
        perdedor: pokemonBAtualizado,
      };
    }
    console.log(`Pokemon ${pokemonB.id} vence`);
    pokemonBAtualizado = await pokemons.incrementaNivel(pokemonB.id);
    pokemonAAtualizado = await pokemons.decrementaNivel(pokemonA.id);
    result = {
      vencedor: pokemonBAtualizado,
      perdedor: pokemonAAtualizado,
    };
    return result;
  }
}

module.exports = Batalhas;
