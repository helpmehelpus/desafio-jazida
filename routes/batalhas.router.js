const express = require('express');
const Batalhas = require('../controllers/batalhas');

const batalhas = new Batalhas();

const router = express.Router();

/**
 * @api {POST} /batalhar/:pokemonAId/:pokemonBId [POST] Colocar Pokemon A para batalhar contra B
 * @apiGroup Pokemons
 *
 * @apiParam {Number} pokemonAId required
 * @apiParam {Number} pokemonBId required
 *
 * @apiExample Example usage:
 *  POST /batalhar/16/14
 *
 * @apiSuccess {JSON} Pokemon object
 * @apiSuccessExample {JSON} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "vencedor": {
 *      "id": 16,
 *      "tipo": "charizard",
 *      "treinador": "Jun",
 *      "nivel": 7
 *     },
 *    "perdedor": {
 *      "id": 14,
 *      "tipo": "mewtwo",
 *      "treinador": "Adriano"
 *      "nivel": 5
 *    }
 *  }
 * @apiErrorExample {JSON}
 *  HTTP/1.1 400
 */
router.route('/:pokemonAId/:pokemonBId')
  .post((req, res) => {
    batalhas.batalhar(req.params.pokemonAId, req.params.pokemonBId)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

module.exports = router;
