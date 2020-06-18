define({ "api": [
  {
    "type": "DELETE",
    "url": "/pokemons/:id",
    "title": "[DELETE] Deletar pokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>required</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /pokemons/:8",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 204",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pokemon.router.js",
    "groupTitle": "Pokemons",
    "name": "DeletePokemonsId"
  },
  {
    "type": "GET",
    "url": "/pokemons",
    "title": "[GET] Listar todos os pokemons",
    "group": "Pokemons",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /pokemons/",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "[{\n  \"id\": 1,\n  \"tipo\": \"pikachu\",\n  \"treinador\": \"Thiago\",\n  \"nivel\": 1\n}, {\n  \"id\": 2,\n  \"tipo\": \"charizard\",\n  \"treinador\": \"Renato\",\n  \"nivel\": 1\n}]",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pokemon.router.js",
    "groupTitle": "Pokemons",
    "name": "GetPokemons"
  },
  {
    "type": "GET",
    "url": "/pokemons/:id",
    "title": "[GET] Carregar Pokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>required</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /pokemons/:id",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": " HTTP/1.1 200\n{\n  \"id\": 1,\n  \"tipo\": \"pikachu\",\n  \"treinador\": \"Thiago\",\n  \"nivel\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }",
          "content": "HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pokemon.router.js",
    "groupTitle": "Pokemons",
    "name": "GetPokemonsId"
  },
  {
    "type": "POST",
    "url": "/batalhar/:pokemonAId/:pokemonBId",
    "title": "[POST] Colocar Pokemon A para batalhar contra B",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pokemonAId",
            "description": "<p>required</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pokemonBId",
            "description": "<p>required</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /batalhar/16/14",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Pokemon",
            "description": "<p>object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"vencedor\": {\n    \"id\": 16,\n    \"tipo\": \"charizard\",\n    \"treinador\": \"Jun\",\n    \"nivel\": 7\n   },\n  \"perdedor\": {\n    \"id\": 14,\n    \"tipo\": \"mewtwo\",\n    \"treinador\": \"Adriano\"\n    \"nivel\": 5\n  }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 400",
          "content": "HTTP/1.1 400",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/batalhas.router.js",
    "groupTitle": "Pokemons",
    "name": "PostBatalharPokemonaidPokemonbid"
  },
  {
    "type": "POST",
    "url": "/pokemons",
    "title": "[POST] Criar novo pokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo",
            "description": "<p>required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "treinador",
            "description": "<p>required</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /pokemons/\nbody:\n{\n  \"tipo\": \"charizard\",\n  \"treinador\": \"adriano\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 11\n  \"tipo\": \"charizard\"\n  \"treinador\": \"Ash\"\n  \"nivel\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 { code: 400, message: 'Tipo psyduck invalido.' }",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pokemon.router.js",
    "groupTitle": "Pokemons",
    "name": "PostPokemons"
  },
  {
    "type": "PUT",
    "url": "/pokemons/:id",
    "title": "[PUT] Alterar pokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "treinador",
            "description": "<p>required</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /pokemons/8\n body:\n {\n   treinador: \"Gary\"\n }",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 204",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 { code: 404, message: `Pokemon com id 84 nao encontrado.` }",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pokemon.router.js",
    "groupTitle": "Pokemons",
    "name": "PutPokemonsId"
  }
] });
