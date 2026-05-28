const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const cabecalhoAutorizacao = req.headers.authorization;
  const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token nao informado.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    return next();
  } catch (erro) {
    return res.status(403).json({ mensagem: 'Token invalido.' });
  }
}

module.exports = autenticarToken;
