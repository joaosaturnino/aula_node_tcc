const db = require("../database/connection");
const express = require('express');
const router = express.Router();

//importação dos controllers utilizados nas rotas:
const UsuariosController = require('../controllers/usuariosController');
const CidadesController = require('../controllers/cidadesController');
const CategoriasController = require('../controllers/categoriasController');
const EstabelecimentosController = require('../controllers/estabelecimentosController');
const ProdutosController = require('../controllers/produtosController');
const LinksController = require('../controllers/linksController');
const TamanhosController = require('../controllers/tamanhosController');
const TelefonesController = require('../controllers/telefonesController');
const IngredientesController = require('../controllers/ingredientesController');
const ProdIngController = require('../controllers/prod_ingController');
const FavoritosController = require('../controllers/favoritosController');

//definição de rotas
router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/cidades', CidadesController.listarCidades);
router.get('/categorias', CategoriasController.listarCategorias);
router.get('/estabelecimentos', EstabelecimentosController.listarEstabelecimentos);
router.get('/produtos', ProdutosController.listarProdutos);
router.get('/links', LinksController.listarLinks);
router.get('/tamanhos', TamanhosController.listarTamanhos);
router.get('/telefones', TelefonesController.listarTelefones);
router.get('/ingredientes', IngredientesController.listarIngredientes);
router.get('/proding', ProdIngController.listarProdIng);
router.get('/favoritos', FavoritosController.listarFavoritos);


module.exports = router;
