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
};