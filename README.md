# desafio-jazida
Repositório contendo código da API criada para manipulação de Pokemons.

Para rodar a aplicação, clone o projeto, e rode na pasta raíz:

```
npm install
npm run start
```

Para rodar testes unitários e de integração:

```
npm run unit-tests
npm run integration-tests
```
A documentação gerada automaticamente se encontra em /apidoc/

A aplicação também está hospedada no Heroku em: https://cryptic-waters-26549.herokuapp.com/

A aplicação escrita em NodeJS consiste em um CRUD básico para manipulação de Pokemons, junto com a funcionalidade de realizar batalhas entre dois Pokemons. A chance de vitória de um pokemon é proporcional à diferença entre os níveis dos pokemons, segundo a relação:

chanceA = nivelA / (nivelA + nivelB)

Observe que,se os níveis dos pokemons são iguais, ambos têm a mesma chance. Conforme a diferença dos níveis aumenta, a probabilidade do maior nível vencer tende a 1.
