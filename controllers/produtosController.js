// João Guilherme

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarProdutos(request, response) {
        try {
            const sql = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos';
            const produtos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response){
        try{
            const {proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao} = request.body;

            const sql = 'INSERT INTO produtos (proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao];
            const confirmacao = await db.query(sql, values);

            const idInst = confirmacao[0].insertId

            return response.status(200).json({confirma: 'sucesso', message: idInst})
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error})
        }
    },
    async update(request, response){
        try{
            // Paraetros passados via corpo da requisição 
            const {proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao} = request.body;
            // Parametro passado via url na chamada da API pelo front end 
            const {proId} = request.params;
            // Instrução SQL para atualização
            const sql = "UPDATE categorias SET proNome = ?, cat_Id = ?, proImagem = ?, ProAtualizacao = ?, proDescricao WHERE proId = ?;";
            // Definição de array com os parametros que receberam os valores do front-end
            const values = [proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao, proId];
            // Executa a instrução no banco de dados
            const atualização = await db.query(sql, values);
            //
            return response.status(200).json({Confirma :"Sucesso", message: "Dados Atualizados"})
        } catch(error){
            return response.status(500).json({confirma: "Erro", message: error})
        }
    },

    async delete(request, response){
        try{

            const { proId } = request.params;

            const sql = "DELETE FROM produtos WHERE proId = ?";

            const values = [proId];
            
            await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Produto ' + proId + ' excluída com sucesso'})
        }catch(error){
            return response.status(500).json({confirma:'Erro', message: error})
        }
    },

    async listarProduto(request, response){
        try{
            const {proId} = request.params;

            const sql = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos WHERE proId = ?;';

            const values = [proId];

            const produto = await db.query(sql, values)

            return response.status(200).json({confirma:'Sucesso', message: produto[0]})
        }catch(error){
            return response.status(500).json({confirma:'Erro', message: error})
        }
    }

};

module.exports={
    async listarProdutos(request, response){
        try{
            const {page = 1, limit = 20} = request.query;
            const inicio = (page -1) * limit;

            const {proNome = '%%'} = request.query;
            const {cat_Id = '%%'} = request.query;

            const proNomeProd = proNome === '%%' ? '%%' : '%' + proNome + '%';

            const countProd = await bd.query(`SELECT COUNT(*) AS cat_Id FROM produtos WHERE proNome LIKE ? AND cat_Id LIKE ?`);
            const valuesCount = [proNome, cat_Id]
            const n_prod = await db.query(countProd, valuesCount)

            const sql = ('SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, tamPreco, tamPrecoPromo, tamPrato, proDescricao FROM produtos Inner join Categorias cat ON cat_Id = cat.catId INNER JOIN Estabelecimentos est ON est_Id = est.estId INNER JOIN Tamanhos tm ON proId = tm.pro_Id  Where proNome LIKE "%%" AND tamPrato LIKE "%%" AND cat_Id LIKE "%%" AND est_Id LIKE "%%" AND tamPromo LIKE "%%" LIMIT 0, 20')
            
            const values = [proNomeProd, cat_Id, parseInt(inicio), parseInt(limit)];
            const produtos = await db.query(sql, values);

            response.header('X-Total-Count', n_prod[0][0].cat_Id);
            return response.status(200).json(produtos[0]);
        } catch(error){
            return response.status(500).jason({confirma: 'Erro', message: error}); 
        }
    }
}



