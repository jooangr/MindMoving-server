const express = require('express');
const router = express.Router();
const { getPerfil, saveOrUpdatePerfil } = require('../controllers/perfilController');

router.get('/:usuarioId', getPerfil);
router.post('/', saveOrUpdatePerfil);

module.exports = router;
