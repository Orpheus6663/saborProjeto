const express = require('express');
const autenticarToken = require('../Middlewares/autenticacao');
const { cadastrarCategoria, listarCategorias } = require('../Controllers/categoriaController');

const router = express.Router();

router.get('/categorias', listarCategorias);
router.post('/categorias', autenticarToken, cadastrarCategoria);

module.exports = router;
