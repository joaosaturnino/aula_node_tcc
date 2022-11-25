const db = require("../database/connection");
const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuariosController');
const CategoriasController = require('../controllers/categoriasController');
const EstabelecimentosController = require('../controllers/estabelecimentosController');
const ProdutosController = require('../controllers/produtosController');
const TamanhosController = require('../controllers/tamanhosController');
const FavoritosController = require('../controllers/favoritosController');

const upload = require('../middlewares/uploadimageproduto');

router.get('/usuarios/:usuId', UsuariosController.listarUsuarios);
router.post('/usuarios', UsuariosController.create);
router.patch('/usuarios/:usuId', UsuariosController.update);
router.delete('/usuarios/:usuId', UsuariosController.delete);
router.post('/usuarios/login', UsuariosController.session);


router.get('/categorias', CategoriasController.listarCategorias);
router.post('/categorias', CategoriasController.create)
router.patch('/categorias/:catId', CategoriasController.update)
router.delete('/categorias/:catId', CategoriasController.delete)


router.get('/estabelecimentos', EstabelecimentosController.listarEstabelecimentos);
router.get('/estabelecimentos/:estId', EstabelecimentosController.listarUnicoEstabelecimento);
router.post('/estabelecimentos', upload.single('img'), EstabelecimentosController.create);
router.patch('/estabelecimentos/:estId', EstabelecimentosController.update);
router.delete('/estabelecimentos/:estId', EstabelecimentosController.delete);


router.get('/produtos', ProdutosController.listarProdutos);
router.get('/produtosal', ProdutosController.listarAleatorio);
router.post('/produtos', upload.single('img'), ProdutosController.create)


router.get('/tamanhos', TamanhosController.listarTamanhos);
router.post('/tamanhos', TamanhosController.create);
router.patch('/tamanhos/:tamId', TamanhosController.update);


router.get('/favoritos/:usu_id', FavoritosController.listarFavoritos);
router.post('/favoritos', FavoritosController.create);
//editar
router.delete('/favoritos/:usu_id/:pro_id', FavoritosController.delete);


module.exports = router;
