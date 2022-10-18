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

const upload = require('../middlewares/uploadimageproduto');


//definição de rotas
//router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/usuarios/:usuId', UsuariosController.listarUsuarios);
router.post('/usuarios', UsuariosController.create);
router.patch('/usuarios/:usuId', UsuariosController.update);
router.delete('/usuarios/:usuId', UsuariosController.delete);
router.post('/usuarios/login', UsuariosController.session);

router.get('/cidades', CidadesController.listarCidades);
//cadastrar
//editar
//excluir

router.get('/categorias', CategoriasController.listarCategorias);
router.post('/categorias', CategoriasController.create)
router.patch('/categorias/:catId', CategoriasController.update)
router.delete('/categorias/:catId', CategoriasController.delete)


router.get('/estabelecimentos', EstabelecimentosController.listarEstabelecimentos);
router.get('/estabelecimentos/:estId', EstabelecimentosController.listarUnicoEstabelecimento);
router.post('/estabelecimentos', EstabelecimentosController.create);
router.patch('/estabelecimentos/:estId', EstabelecimentosController.update);
router.delete('/estabelecimentos/:estId', EstabelecimentosController.delete);

router.get('/produtos', ProdutosController.listarProdutos);
// router.get('/produtos/:proId', ProdutosController.listarProduto);
router.post('/produtos', upload.single('img'), ProdutosController.create)
// router.patch('/produtos/:proId', ProdutosController.update)
// router.delete('/produtos/:proId', ProdutosController.delete)

router.get('/links', LinksController.listarLinks);
router.get('/links/:lnkId', LinksController.listarLink);
router.post('/links', LinksController.create);
router.patch('/links/:lnkId', LinksController.update);
//cadastrar
//editar
//excluir
router.get('/tamanhos', TamanhosController.listarTamanhos);
router.post('/tamanhos', TamanhosController.create);
router.patch('/tamanhos/:tamId', TamanhosController.update);
//cadastrar
//editar
//excluir
router.get('/telefones/:est_Id', TelefonesController.listarTelefones);
router.post('/telefones', TelefonesController.create);
router.patch('/telefones/:telId', TelefonesController.update);
router.delete('/telefones/:telId', TelefonesController.delete);

router.get('/ingredientes', IngredientesController.listarIngredientes);
router.post('/ingredientes', IngredientesController.create);
router.patch('/ingredientes/:igtId', IngredientesController.update);
//excluir

router.get('/proding', ProdIngController.listarProdIng);
router.post('/proding', ProdIngController.create)
router.patch('/proding/:pro_id', ProdIngController.update)
//excluir
router.get('/favoritos', FavoritosController.listarFavoritos);
router.post('/favoritos', FavoritosController.create);
//editar
router.delete('/favoritos/:usu_id/:pro_id', FavoritosController.delete);


module.exports = router;
