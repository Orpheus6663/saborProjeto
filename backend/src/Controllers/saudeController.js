const NOME_LOJA = 'Mundo Encantado';

function verificarSaude(req, res) {
  return res.json({
    status: 'ok',
    loja: NOME_LOJA
  });
}

module.exports = {
  verificarSaude
};
