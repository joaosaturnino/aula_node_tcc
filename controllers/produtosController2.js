// João Guilherme

const { json } = require("express");
const db = require("../database/connection");


module.exports={
    async listarProdutos(request, response){
        try{
            const {page = 1, limit = 20} = request.query;
            const inicio = (page -1) * limit;

            const {proNome = '%%'} = request.body;
            const {cat_Id = '%%'} = request.body;
            const {tamPrato = "%%"} = request.body;
            const {est_Id = "%%"} = request.body;
            

            const proNomeProd = proNome === '%%' ? '%%' : '%' + proNome + '%';

            const sqlCount = ('SELECT COUNT(*) AS countProd FROM produtos p WHERE p.proNome LIKE ? AND p.cat_Id LIKE ? AND AND p.est_Id LIKE ?;');
            const valuesCount = [proNomeProd, cat_Id, tamPrato, est_Id, tamPromo];
            const n_prod = await db.query(sqlCount, valuesCount);

            const sql = ('SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proPreco, proDescricao FROM produtos Inner join Categorias cat ON cat_Id = cat.catId INNER JOIN Estabelecimentos est ON est_Id = est.estId Where proNome LIKE ? AND cat_Id LIKE ?  AND est_Id LIKE ?  ORDER BY proPreco LIMIT ?, ?;');
            
            const values = [proNomeProd, cat_Id, est_Id,  parseInt(inicio), parseInt(limit)];
            const produtos = await db.query(sql, values);

            const sqlT = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos WHERE proNome LIKE ?;';
            const valuesCountT = [proNome];
            const produtosT = await db.query(sqlT, valuesCountT);

            response.header('X-Total-Count', n_prod[0][0].countProd);
            //return response.status(200).json(produtos[0]);
            return response.status(200).json({confirma:'Sucesso', nResults: produtos[0].length,Total: produtosT[0].length, message: produtos[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error}); 
        }
    },

    async create(request, response){
        try{
            const {proNome, cat_Id, est_Id, proImagem, proPreco, proAtualizacao, proDescricao} = request.body;

            const sql = 'INSERT INTO produtos (proNome, cat_Id, est_Id, proImagem, proPreco, proAtualizacao, proDescricao) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [proNome, cat_Id, est_Id, proImagem, proPreco, proAtualizacao, proDescricao];
            const confirmacao = await db.query(sql, values);

            const idInst = confirmacao[0].insertId

            const dados = {nome: proNome, categoria: cat_Id, estabelecimento: est_Id, imagem: proImagem, preço: proPreco, Atualizado: proAtualizacao, descrição: proDescricao}

            return response.status(200).json({confirma: 'sucesso',Info: dados, message: idInst})
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error})
        }
    },

    //     async listaProdutos(request, response) {
    //     try {
    //         const sql = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos';
    //         const produtos = await db.query(sql);
    //         //console.log('tam: ' + usuarios[0].length);
    //         //return response.status(200).json(usuarios[0]);
    //         return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});
    //     } catch (error) {
    //         return response.status(500).json({confirma: 'Erro', message: error});
    //     }
    // },


}



// module.exports = {
//     async listarProdutos(request, response) {
//         try {
//             const sql = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos';
//             const produtos = await db.query(sql);
//             //console.log('tam: ' + usuarios[0].length);
//             //return response.status(200).json(usuarios[0]);
//             return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});
//         } catch (error) {
//             return response.status(500).json({confirma: 'Erro', message: error});
//         }
//     },

    // async create(request, response){
    //     try{
    //         const {proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao} = request.body;

    //         const sql = 'INSERT INTO produtos (proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao) VALUES (?, ?, ?, ?, ?, ?)';
    //         const values = [proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao];
    //         const confirmacao = await db.query(sql, values);

    //         const idInst = confirmacao[0].insertId

    //         return response.status(200).json({confirma: 'sucesso', message: idInst})
    //     } catch(error){
    //         return response.status(500).json({confirma: 'Erro', message: error})
    //     }
    // },
//     async update(request, response){
//         try{
//             // Paraetros passados via corpo da requisição 
//             const {proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao} = request.body;
//             // Parametro passado via url na chamada da API pelo front end 
//             const {proId} = request.params;
//             // Instrução SQL para atualização
//             const sql = "UPDATE categorias SET proNome = ?, cat_Id = ?, proImagem = ?, ProAtualizacao = ?, proDescricao WHERE proId = ?;";
//             // Definição de array com os parametros que receberam os valores do front-end
//             const values = [proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao, proId];
//             // Executa a instrução no banco de dados
//             const atualização = await db.query(sql, values);
//             //
//             return response.status(200).json({Confirma :"Sucesso", message: "Dados Atualizados"})
//         } catch(error){
//             return response.status(500).json({confirma: "Erro", message: error})
//         }
//     },

//     async delete(request, response){
//         try{

//             const { proId } = request.params;

//             const sql = "DELETE FROM produtos WHERE proId = ?";

//             const values = [proId];
            
//             await db.query(sql, values);

//             return response.status(200).json({confirma: 'Sucesso', message: 'Produto ' + proId + ' excluída com sucesso'})
//         }catch(error){
//             return response.status(500).json({confirma:'Erro', message: error})
//         }
//     }

// };






