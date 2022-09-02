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
//cadastrar
//editar
//excluir
router.get('/cidades', CidadesController.listarCidades);
//cadastrar
//editar
//excluir
router.get('/categorias', CategoriasController.listarCategorias);
//cadastrar
//editar
//excluir
router.get('/estabelecimentos', EstabelecimentosController.listarEstabelecimentos);
router.post('/estabelecimentos', EstabelecimentosController.create);
router.patch('/estabelecimentos/:estId', EstabelecimentosController.update);
//excluir
router.get('/produtos', ProdutosController.listarProdutos);
//cadastrar
//editar
//excluir
router.get('/links', LinksController.listarLinks);
//cadastrar
//editar
//excluir
router.get('/tamanhos', TamanhosController.listarTamanhos);
//cadastrar
//editar
//excluir
router.get('/telefones', TelefonesController.listarTelefones);
router.post('/telefones', TelefonesController.create);
router.patch('/telefones/:telId', TelefonesController.update);
//excluir
router.get('/ingredientes', IngredientesController.listarIngredientes);
router.post('/ingredientes', IngredientesController.create);
router.patch('/ingredientes/:igtId', IngredientesController.update);
//excluir
router.get('/proding', ProdIngController.listarProdIng);
//cadastrar
//editar
//excluir
router.get('/favoritos', FavoritosController.listarFavoritos);
//cadastrar
//editar
//excluir


module.exports = router;
