const db = require("../database/connection");
const express = require('express');
const router = express.Router();

//importação dos controllers utilizados nas rotas:
const UsuariosController = require('../controllers/usuariosController');

//definição de rotas
router.get('/usuarios', UsuariosController.listarUsuarios);


module.exports = router;
