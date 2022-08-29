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
};