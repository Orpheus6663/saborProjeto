const express = require('express');
const { cadastrarUsuario, entrar } = require('../Controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', cadastrarUsuario);
router.post('/entrar', entrar);

module.exports = router;
