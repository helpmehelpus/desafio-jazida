/* eslint-disable class-methods-use-this */
const Pokemons = require('./pokemons');

const pokemons = new Pokemons();

class Batalhas {
  async batalhar(pokemonAId, pokemonBId) {
    let pokemonA = await pokemons.carregar(pokemonAId);
    if (!pokemonA.id) {
      return { code: 404, message: `Pokemon com id ${pokemonAId} nao encontrado.` };
    }
    let pokemonB = await pokemons.carregar(pokemonBId);
    if (!pokemonB.id) {
      return { code: 404, message: `Pokemon com id ${pokemonBId} nao encontrado.` };
    }
    const pokemonAVenceu = false;
    const chanceVitoriaDeA = pokemonA.nivel / (pokemonA.nivel + pokemonB.nivel);
    const sorteio = Math.random();
    if (sorteio <= chanceVitoriaDeA) {
      console.log(`Pokemon ${pokemonA.id} vence`);
      pokemonA = await pokemons.incrementaNivel(pokemonA.id);
      pokemonB = await pokemons.decrementaNivel(pokemonB.id);
      pokemonAVenceu = true;
    } else {
      console.log(`Pokemon ${pokemonB.id} vence`);
      pokemonB = await pokemons.incrementaNivel(pokemonB.id);
      pokemonA = await pokemons.decrementaNivel(pokemonA.id);
    }
    let result;
    if (pokemonAVenceu) {
      result = {
        vencedor: pokemonA,
        perdedor: pokemonB,
      };
    } else {
      result = {
        vencedor: pokemonB,
        perdedor: pokemonA,
      };
    }
    console.log(`novo level pokemon ${pokemonA.id}:`, pokemonA.nivel);
    console.log(`novo level pokemon ${pokemonB.id}:`, pokemonB.nivel);
    return result;
  }
}

module.exports = Batalhas;
