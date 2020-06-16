const express = require('express');
const Pokemons = require('../controllers/pokemons');

const pokemons = new Pokemons();

const router = express.Router();

/**
 * @api {POST} /pokemons [POST] Criar novo pokemon
 * @apiGroup Pokemons
 *
 * @apiSuccess {JSON} Pokemon
 * @apiSuccessExample {JSON} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 11
 *    "tipo": "charizard"
 *    "treinador": "Ash"
 *    "nivel": 1
 *  }
 * @apiErrorExample {JSON}
 *  HTTP/1.1 400
 *
 */
router.route('/')
  .post((req, res) => {
    pokemons.criar(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
   * @api {PUT} /pokemons/:id Alterar pokemon
   * @apiGroup Pokemons
   *
   * @apiSuccess {JSON}
   *  HTTP/1.1 204
   *
   * @apiErrorExample {JSON}
   *  HTTP/1.1 400
   */
router.route('/:id')
  .put((req, res) => {
    pokemons.alterar(req.params.id, req.body.treinador)
      .then(() => res.status(204).end())
      .catch((err) => res.status(err.code || 500).send(err));
  });

module.exports = router;
