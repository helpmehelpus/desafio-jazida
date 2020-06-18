const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const Pokemons = require('../../controllers/pokemons');

const pokemons = new Pokemons();

const criarPokemonMock = require('../mocks/pokemons.criar.json');
const alterarPokemonMock = require('../mocks/pokemons.alterar.json');
const deletarPokemonMock = require('../mocks/pokemons.deletar.json');
const carregarPokemonMock = require('../mocks/pokemons.carregar.json');
const  listarPokemonMock = require('../mocks/pokemons.listar.json');

describe('Pokemon Controller', () => {
  describe('Criar pokemon', () => {
    afterEach(() => {
      pokemons.criar.restore();
    });
    it('Deve retornar o pokemon criado', async () => {
      sinon.stub(pokemons, 'criar')
        .withArgs({ tipo: 'pikachu', treinador: 'Jun' })
        .resolves(criarPokemonMock.sucessoCriar);
      const response = await pokemons.criar({ tipo: 'pikachu', treinador: 'Jun' });
    });
    it('Pokemon criado deve ter nivel 1', async () => {
      sinon.stub(pokemons, 'criar')
        .withArgs({ tipo: 'pikachu', treinador: 'Jun' })
        .resolves(criarPokemonMock.sucessoCriar);
      const response = await pokemons.criar({ tipo: 'pikachu', treinador: 'Jun' });
      expect(response.nivel).to.equal(1);
    });
    it('Deve retornar erro se tipo nao for \'charizard\', \'mewtwo\', ou \'pikachu\'', async () => {
      sinon.stub(pokemons, 'criar')
        .withArgs({ tipo: 'bulbassauro', treinador: 'Jun' })
        .resolves(criarPokemonMock.erroCriar);
      const response = await pokemons.criar({ tipo: 'bulbassauro', treinador: 'Jun' });
      expect(response.code).to.equal(400);
    });
  });

  describe('Alterar pokemon', () => {
    afterEach(() => {
      pokemons.alterar.restore();
    });
    it('Deve atualizar o treinador do Pokemon', async () => {
      sinon.stub(pokemons, 'alterar')
        .withArgs(1, 'Adriano')
        .resolves(alterarPokemonMock);
      const response = await pokemons.alterar(1, 'Adriano');
      expect(response.treinador).to.equal('Adriano')
    });
  });

  describe('Deletar pokemon', () => {
    afterEach(() => {
      pokemons.deletar.restore();
    });
    it('Deve deletar o pokemon', async () => {
      sinon.stub(pokemons, 'deletar')
        .withArgs(1)
        .resolves(deletarPokemonMock);
      const response = await pokemons.deletar(1);
      expect(response.code).to.equal(204);
    })
  });

  describe('Carregar pokemon', () => {
    afterEach(() => {
      pokemons.carregar.restore();
    });
    it('Deve retornar um pokemon que existe sem erro', async () => {
      sinon.stub(pokemons, 'carregar')
        .withArgs(1)
        .resolves(carregarPokemonMock.sucessoCarregar);
      const response = await pokemons.carregar(1);
      expect(response.id).to.exist;
    });
    it('Deve retornar erro se o pokemon nao for encontrado', async () => {
      sinon.stub(pokemons, 'carregar')
        .withArgs(1)
        .resolves(carregarPokemonMock.erroCarregar);
      const response = await pokemons.carregar(1);
      expect(response.id).to.not.exist;
    });
  });

  describe('Listar pokemons', () => {
    afterEach(() => {
      pokemons.listar.restore();
    })
    it('Deve retornar uma lista com tamanho do numero de pokemons no banco', async () => {
      sinon.stub(pokemons, 'listar')
        .resolves(listarPokemonMock);
      const response = await pokemons.listar();
      expect(response.length).to.equal(listarPokemonMock.length);
    });
  })
});

