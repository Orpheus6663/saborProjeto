const express = require('express');
const autenticarToken = require('../Middlewares/autenticacao');
const {
  buscarPedidoPorId,
  criarPedido,
  listarPedidosDoUsuario
} = require('../Controllers/pedidoController');

const router = express.Router();

router.get('/pedidos', autenticarToken, listarPedidosDoUsuario);
router.get('/pedidos/:id', autenticarToken, buscarPedidoPorId);
router.post('/pedidos', autenticarToken, criarPedido);

module.exports = router;
