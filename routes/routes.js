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
router.post('/categorias', CategoriasController.create)
router.patch('/categorias/:catId', CategoriasController.update)
router.delete('/categorias/:catId', CategoriasController.delete)


router.get('/estabelecimentos', EstabelecimentosController.listarEstabelecimentos);
//cadastrar
//editar
//excluir
router.get('/produtos', ProdutosController.listarProdutos);
// router.get('/produtos', ProdutosController.listaProdutos);
router.post('/produtos', ProdutosController.create)
// router.patch('/produtos/:proId', ProdutosController.update)
// router.delete('/produtos/:proId', ProdutosController.delete)

router.get('/links', LinksController.listarLinks);
//cadastrar
//editar
//excluir
router.get('/tamanhos', TamanhosController.listarTamanhos);
//cadastrar
//editar
//excluir
router.get('/telefones', TelefonesController.listarTelefones);
//cadastrar
//editar
//excluir
router.get('/ingredientes', IngredientesController.listarIngredientes);
//cadastrar
//editar
//excluir
router.get('/proding', ProdIngController.listarProdIng);
router.post('/proding', ProdIngController.create)
router.patch('/proding/:pro_id', ProdIngController.update)
//excluir
router.get('/favoritos', FavoritosController.listarFavoritos);
//cadastrar
//editar
//excluir


module.exports = router;
