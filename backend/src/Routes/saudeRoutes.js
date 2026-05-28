const express = require('express');
const { verificarSaude } = require('../Controllers/saudeController');

const router = express.Router();

router.get('/saude', verificarSaude);
router.get('/health', verificarSaude);

module.exports = router;
