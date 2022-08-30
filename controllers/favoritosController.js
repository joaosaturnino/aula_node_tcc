//joaohenrique
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarFavoritos(request, response) {
        try {
            const sql = 'SELECT usu_id, pro_id FROM favoritos;';
            const favoritos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: favoritos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};