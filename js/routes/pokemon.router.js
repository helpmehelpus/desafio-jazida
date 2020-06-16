const express = require('express');
const Pokemons = require('../controllers/pokemons');

const pokemons = new Pokemons();

const router = express.Router();

router.route('/')
  .post((req, res) => {
    pokemons.criar(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code || 500).send(err));
  });

module.exports = router;
