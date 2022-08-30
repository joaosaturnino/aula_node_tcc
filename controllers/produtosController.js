// João Guilherme

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarProdutos(request, response) {
        try {
            const sql = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos;';
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
    }
};
