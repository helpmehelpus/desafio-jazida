const express = require('express');
const Pokemons = require('../controllers/pokemons');

const pokemons = new Pokemons();

const router = express.Router();

/**
 * @api {POST} /pokemons [POST] Criar novo pokemon
 * @apiGroup Pokemons
 *
 * @apiParam {String} tipo required
 * @apiParam {String} treinador required
 *
 * @apiExample Example usage:
 *  POST /pokemons/
 *  body:
 *  {
 *    "tipo": "charizard",
 *    "treinador": "adriano"
 *  }
 *
 * @apiSuccessExample {JSON} Success Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 11
 *    "tipo": "charizard"
 *    "treinador": "Ash"
 *    "nivel": 1
 *  }
 *
 * @apiErrorExample {JSON} Error
 *  HTTP/1.1 { code: 400, message: 'Tipo psyduck invalido.' }
 *
 */
router.route('/')
  .post((req, res) => {
    pokemons.criar(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 400).send(err));
  });

/**
 * @api {PUT} /pokemons/:id [PUT] Alterar pokemon
 * @apiGroup Pokemons
 *
 * @apiParam {Number} id required
 * @apiParam {String} treinador required
 *
 * @apiExample Example usage:
 * PUT /pokemons/8
 *  body:
 *  {
 *    treinador: "Gary"
 *  }
 *
 * @apiSuccessExample {JSON} Success Response:
 *  HTTP/1.1 204
 *
 * @apiErrorExample {JSON} Error
 *  HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }
 */
router.route('/:id')
  .put((req, res) => {
    pokemons.alterar(req.params.id, req.body.treinador)
      .then((result) => res.status(result.code || 204).send(result.message))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
 * @api {DELETE} /pokemons/:id [DELETE] Deletar pokemon
 * @apiGroup Pokemons
 *
 * @apiParam {Number} id required
 *
 * @apiExample Example usage:
 * DELETE /pokemons/:8
 *
 * @apiSuccessExample {JSON} Success Response:
 *  HTTP/1.1 204
 *
 * @apiErrorExample {JSON} Error
 *  HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }
 */
router.route('/:id')
  .delete((req, res) => {
    pokemons.deletar(req.params.id)
      .then((result) => res.status(result.code || 204).send(result.message))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
 * @api {GET} /pokemons/:id [GET] Carregar Pokemon
 * @apiGroup Pokemons
 *
 * @apiParam {Number} ID required
 *
 * @apiExample Example usage:
 * GET /pokemons/:id
 *
 * @apiSuccessExample {JSON} Success Response:
 *  HTTP/1.1 200
 * {
 *   "id": 1,
 *   "tipo": "pikachu",
 *   "treinador": "Thiago",
 *   "nivel": 1
 * }
 *
 * @apiErrorExample {JSON}
 *  HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }
 */
router.route('/:id')
  .get((req, res) => {
    pokemons.carregar(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
 * @api {GET} /pokemons [GET] Listar todos os pokemons
 * @apiGroup Pokemons
 *
 * @apiExample Example usage:
 * GET /pokemons/
 *
 * @apiSuccessExample {JSON} Success Response:
 * [{
 *   "id": 1,
 *   "tipo": "pikachu",
 *   "treinador": "Thiago",
 *   "nivel": 1
 * }, {
 *   "id": 2,
 *   "tipo": "charizard",
 *   "treinador": "Renato",
 *   "nivel": 1
 * }]
 *
 */
router.route('/')
  .get((req, res) => {
    pokemons.listar(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

module.exports = router;
