const express = require('express');
const categoriaRoutes = require('./categoriaRoutes');
const enderecoRoutes = require('./enderecoRoutes');
const integracaoRoutes = require('./integracaoRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const produtoRoutes = require('./produtoRoutes');
const saudeRoutes = require('./saudeRoutes');
const usuarioRoutes = require('./usuarioRoutes');

const router = express.Router();

router.use(saudeRoutes);
router.use(usuarioRoutes);
router.use(categoriaRoutes);
router.use(produtoRoutes);
router.use(pedidoRoutes);
router.use(enderecoRoutes);
router.use(integracaoRoutes);

module.exports = router;
