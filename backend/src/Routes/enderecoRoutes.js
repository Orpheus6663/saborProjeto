const express = require('express');
const { buscarEnderecoPorCep } = require('../Controllers/enderecoController');

const router = express.Router();

router.get('/enderecos/:cep', buscarEnderecoPorCep);

module.exports = router;
