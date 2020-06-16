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
 *  POST /pokemons
 *  body:
 *  {
 *    "tipo": "charizard",
 *    "treinador": "adriano"
 *  }
 *
 * @apiSuccess {JSON} Pokemon object
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
   * @apiParam {Number} id required
   * @apiParam {String} treinador required
   *
   * @apiExample Example usage:
   * PUT /pokemons/:id
   *  body:
   *  {
   *    treinador: "Gary"
   *  }
   *
   * @apiSuccess {JSON}
   *  HTTP/1.1 204
   *
   * @apiErrorExample {JSON}
   *  HTTP/1.1 404
   */
router.route('/:id')
  .put((req, res) => {
    pokemons.alterar(req.params.id, req.body.treinador)
      .then((result) => res.status(result.code || 204).send(result.message))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
   * @api {DELETE} /pokemons/:id
   * @apiGroup Pokemons
   *
   * @apiParam {Number} id required
   *
   * @apiExample Example usage:
   * DELETE /pokemons/:id
   *
   * @apiSuccess {JSON}
   *  HTTP/1.1 204
   *
   * @apiErrorExample {JSON}
   *  HTTP/1.1 404
   */
router.route('/:id')
  .delete((req, res) => {
    pokemons.deletar(req.params.id)
      .then((result) => res.status(result.code || 204).send(result.message))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
 * @api {GET} /pokemons/:id Carregar Pokemon
 * @apiGroup Pokemons
 *
 * @apiParam {Number} ID required
 *
 * @apiExample Example usage:
 * GET /pokemons/:id
 *
 * @apiSuccess {JSON}
 * HTTP/1.1 200
 *
 * @apiErrorExample {JSON}
 *  HTTP/1.1 404
 */
router.route('/:id')
  .get((req, res) => {
    pokemons.carregar(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

/**
   * @api {GET} /pokdemons
   * @apiGroup Pokemons
   *
   * @apiExample Example usage:
   * GET /pokemons/
   *
   * @apiSucces {JSON}
   * HTTP/1.1200
   */
router.route('/')
  .get((req, res) => {
    pokemons.listar(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

module.exports = router;
