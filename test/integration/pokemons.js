const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../server');
const should = chai.should();
const expect = chai.expect;

describe('Pokemons', () => {
  let pokemonCriado;
  describe('POST /pokemon', () => {
    it('Deve criar um pokemon com tipo valido e nivel', (done) => {
      let pokemon = {
        tipo: "pikachu",
        treinador: "Jun"
      }
    chai.request(app)
      .post('/pokemons')
      .send(pokemon)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('tipo')
        res.body.should.have.property('treinador');
        pokemonCriado = res.body;
        done();
      });
    })

    it('Deve retornar erro se tipo diferente de charizard, mewtwo ou pikachu', (done) => {
      let pokemon = {
        tipo: "squirtle",
        treinador: "Jun"
      }
    chai.request(app)
      .post('/pokemons')
      .send(pokemon)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    })
  });

  describe('PUT /pokemon/:id', () => {
    it('Deve atualizar o treinador do pokemon e retornar 204', (done) => {
      chai.request(app)
        .put(`/pokemons/${pokemonCriado.id}`)
        .send({ treinador: "Yan" })
        .end((err, res) => {
          res.should.have.status(204);
          done();
        })
    });
  });

  describe('GET /pokemon/:id', () => {
    it('Deve retornar um pokemon ja existente', (done) => {
      chai.request(app)
        .get(`/pokemons/${pokemonCriado.id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('id')
            done();
        })
    })
    it('Deve retornar erro para um pokemon nao existente', (done) => {
      chai.request(app)
        .get('/pokemons/999999')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });
  });

  describe('DELETE /pokemons/:id', () => {
    it('Deve deletar o pokemon existente e retornar 204', (done) => {
      chai.request(app)
        .delete(`/pokemons/${pokemonCriado.id}`)
        .send()
        .end((err, res) => {
          res.should.have.status(204);
          done();
        })
    });

    it('Deve retornar 404 ao tentar deletar pokemon inexistente', (done) => {
      chai.request(app)
        .delete('/pokemons/99999999')
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });
  })

  describe('GET /pokemons', () => {
    it('Deve retornar uma lista com os pokemons existentes na db', (done) => {
      chai.request(app)
        .get('/pokemons')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array');
          done();
        });
    })
  })
});