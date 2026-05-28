const express = require('express');
const {
  atualizarContato,
  buscarContatoPorId,
  criarContato,
  criarPagamento,
  enviarEmail,
  listarContatos,
  removerContato
} = require('../Controllers/integracaoController');

const router = express.Router();

router.post('/emails', enviarEmail);
router.get('/contatos', listarContatos);
router.get('/contatos/:id', buscarContatoPorId);
router.post('/contatos', criarContato);
router.put('/contatos/:id', atualizarContato);
router.delete('/contatos/:id', removerContato);
router.post('/pagamentos', criarPagamento);

module.exports = router;
