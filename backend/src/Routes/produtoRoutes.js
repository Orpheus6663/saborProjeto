const express = require('express');
const autenticarToken = require('../Middlewares/autenticacao');
const {
  atualizarProduto,
  buscarProdutoPorId,
  cadastrarProduto,
  listarProdutos,
  removerProduto
} = require('../Controllers/produtoController');

const router = express.Router();

router.get('/produtos', listarProdutos);
router.get('/produtos/:id', buscarProdutoPorId);
router.post('/produtos', autenticarToken, cadastrarProduto);
router.put('/produtos/:id', autenticarToken, atualizarProduto);
router.delete('/produtos/:id', autenticarToken, removerProduto);

module.exports = router;
