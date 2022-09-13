const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTamanhos(request, response) {
        try {
            const sql = 'SELECT tamId, tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo FROM tamanhos;';
            const tamanhos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: tamanhos[0].length, message: tamanhos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response) {
        try {
            const { tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo } = request.body;

            const sql = 'INSERT INTO tamanhos (tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo) VALUES (?, ?, ?, ?, ?)';
            const values = [tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo];
            const confirmacao = await db.query(sql, values);
            const tamanho_id = confirmacao[0].insertId;
        
            return response.status(200).json({confirma: 'Sucesso', message: tamanho_id});            
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});            
        }        
    },    

    async update(request, response) {
        try {
            const { tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo } = request.body;
            const { tamId } = request.params;

            const sql = 'UPDATE tamanhos SET tamPrato = ?, pro_Id = ?, tamPreco = ?, tamPrecoPromo = ?, tamPromo = ? WHERE tamId = ?';
            const values = [tamPrato, pro_Id, tamPreco, tamPrecoPromo, tamPromo, tamId];
            const atualizacao = await db.query(sql, values);
        
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});            
        }        
    },        
};